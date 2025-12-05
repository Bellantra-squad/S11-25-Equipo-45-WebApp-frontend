import { useEffect, useRef, useCallback, useState } from "react";
import { TOKEN_KEY } from "../refine/providers/authProvider";
import { WebSocketActivityEvent } from "../interfaces/models/whatsapp.interface";

interface UseWebSocketOptions {
  channel?: "activities" | "tasks" | "general";
  onMessage?: (event: WebSocketActivityEvent) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  lastMessage: WebSocketActivityEvent | null;
  sendMessage: (data: object) => void;
  disconnect: () => void;
  reconnect: () => void;
}

/**
 * Hook para gestionar conexiones WebSocket con el backend
 * Se conecta a /ws/{channel}/ y escucha eventos en tiempo real
 */
export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    channel = "activities",
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isConnectingRef = useRef(false);
  
  // Refs para callbacks - evita recrear la conexión cuando cambian
  const onMessageRef = useRef(onMessage);
  const onConnectRef = useRef(onConnect);
  const onDisconnectRef = useRef(onDisconnect);
  const onErrorRef = useRef(onError);

  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketActivityEvent | null>(null);

  // Mantener las referencias actualizadas de los callbacks
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    onConnectRef.current = onConnect;
  }, [onConnect]);

  useEffect(() => {
    onDisconnectRef.current = onDisconnect;
  }, [onDisconnect]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Construir URL del WebSocket
  const getWebSocketUrl = useCallback(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const token = localStorage.getItem(TOKEN_KEY);
    
    console.log("[WebSocket] API URL from env:", apiUrl);
    console.log("[WebSocket] Token exists:", !!token);
    
    // Convertir HTTP a WS y obtener solo el host:port (sin /api/ u otros paths)
    const wsProtocol = apiUrl.startsWith("https") ? "wss" : "ws";
    
    // Extraer solo host:port de la URL
    const wsHost = apiUrl
      .replace(/^https?:\/\//, "")  // Quitar protocolo
      .split("/")[0];               // Tomar solo host:port (antes del primer /)
    
    let url = `${wsProtocol}://${wsHost}/ws/${channel}/`;
    
    if (token) {
      url += `?token=${encodeURIComponent(token)}`;
    }
    
    console.log("[WebSocket] Final URL:", url.split('?')[0]);
    
    return url;
  }, [channel]);

  // Limpiar timeout de reconexión
  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Enviar mensaje al WebSocket
  const sendMessage = useCallback((data: object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("[WebSocket] Cannot send message: not connected");
    }
  }, []);

  // Desconectar WebSocket
  const disconnect = useCallback(() => {
    clearReconnectTimeout();
    reconnectAttemptsRef.current = maxReconnectAttempts;
    isConnectingRef.current = false;
    
    if (wsRef.current) {
      wsRef.current.close(1000, "Client disconnect");
      wsRef.current = null;
    }
    setIsConnected(false);
  }, [clearReconnectTimeout, maxReconnectAttempts]);

  // Conectar al montar - efecto principal
  useEffect(() => {
    // Evitar conexiones duplicadas
    if (isConnectingRef.current || (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)) {
      return;
    }

    isConnectingRef.current = true;
    const url = getWebSocketUrl();
    console.log(`[WebSocket] Connecting to ${url.split('?')[0]}...`);

    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log(`[WebSocket] ✅ Connected to channel: ${channel}`);
        isConnectingRef.current = false;
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
        onConnectRef.current?.();
      };

      ws.onmessage = (event) => {
        try {
          const data: WebSocketActivityEvent = JSON.parse(event.data);
          setLastMessage(data);
          onMessageRef.current?.(data);

          if (data.type === "connection_established") {
            console.log(`[WebSocket] 🎉 ${data.message}`);
          }
        } catch (error) {
          console.error("[WebSocket] Error parsing message:", error);
        }
      };

      ws.onclose = (event) => {
        console.log(`[WebSocket] ❌ Disconnected (code: ${event.code}, reason: ${event.reason || 'none'})`);
        isConnectingRef.current = false;
        setIsConnected(false);
        wsRef.current = null;
        onDisconnectRef.current?.();

        // Códigos que NO deben reconectar:
        // 1000 = cierre normal
        // 1006 = conexión anormal (problema de red/config, no reconectar)
        // 4001 = error de autenticación
        const noReconnectCodes = [1000, 1006, 4001];
        
        if (!noReconnectCodes.includes(event.code) && autoReconnect) {
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current += 1;
            console.log(`[WebSocket] 🔄 Reconnecting ${reconnectAttemptsRef.current}/${maxReconnectAttempts}...`);
            
            clearReconnectTimeout();
            reconnectTimeoutRef.current = setTimeout(() => {
              isConnectingRef.current = false; // Reset para permitir reconexión
            }, reconnectInterval);
          }
        } else if (event.code === 1006) {
          console.error("[WebSocket] ⚠️ Code 1006: Connection failed. Check if backend is running and URL is correct.");
        }
      };

      ws.onerror = (error) => {
        console.error("[WebSocket] ⚠️ Error:", error);
        isConnectingRef.current = false;
        onErrorRef.current?.(error);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("[WebSocket] Failed to create connection:", error);
      isConnectingRef.current = false;
    }

    // Cleanup al desmontar
    return () => {
      clearReconnectTimeout();
      isConnectingRef.current = false;
      if (wsRef.current) {
        wsRef.current.close(1000, "Component unmounted");
        wsRef.current = null;
      }
    };
  }, [channel, getWebSocketUrl, autoReconnect, maxReconnectAttempts, reconnectInterval, clearReconnectTimeout]);

  // Reconectar manualmente
  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    isConnectingRef.current = false;
    if (wsRef.current) {
      wsRef.current.close(1000, "Manual reconnect");
      wsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  // Ping periódico para mantener la conexión viva
  useEffect(() => {
    if (!isConnected) return;

    const pingInterval = setInterval(() => {
      sendMessage({ action: "ping" });
    }, 30000);

    return () => clearInterval(pingInterval);
  }, [isConnected, sendMessage]);

  return {
    isConnected,
    lastMessage,
    sendMessage,
    disconnect,
    reconnect,
  };
}

/**
 * Hook especializado para escuchar actividades de mensajes de WhatsApp
 */
export function useWhatsAppMessageListener(onNewMessage: () => void) {
  const onNewMessageRef = useRef(onNewMessage);
  
  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
  }, [onNewMessage]);

  // Handler estable que no cambia entre renders
  const handleMessage = useCallback((event: WebSocketActivityEvent) => {
    if (event.type === "activity_created" && event.data?.activity_type === "message") {
      console.log("[WhatsApp] 📩 New message activity, refreshing...");
      onNewMessageRef.current();
    }
  }, []);

  return useWebSocket({
    channel: "activities",
    onMessage: handleMessage,
  });
}

export const useActivityWebSocket = (onNewActivity: () => void) => {
  const callbackRef = useRef(onNewActivity);

  useEffect(() => {
    callbackRef.current = onNewActivity;
  }, [onNewActivity]);

  const handleMessage = useCallback((event: WebSocketActivityEvent) => {
     if (event.type === "activity_created") {
      console.log("📩 Nueva actividad desde WebSocket:", event);
      callbackRef.current();
     }
  }, []);

  return useWebSocket({
    channel: "activities",
    onMessage: handleMessage,
  });
};

export default useWebSocket;
