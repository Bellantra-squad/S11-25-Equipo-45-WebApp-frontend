interface PageLoaderProps {
  tip?: string;
  fullScreen?: boolean;
}

export const AppLoader: React.FC<PageLoaderProps> = ({
  tip = "Cargando...",
  fullScreen = true,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: fullScreen ? "100vh" : "100%",
        width: "100%",
        background:
          "linear-gradient(135deg, #f5f3ff 0%, #faf5ff 50%, #f0f9ff 100%)",
        gap: 24,
      }}
    >
      {/* Logo animado */}
      <div
        style={{
          position: "relative",
          width: 80,
          height: 80,
        }}
      >
        {/* Círculos animados */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#9254c9",
            animation: "spin 1s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#b37feb",
            animation: "spin 1.5s linear infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 16,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#d3adf7",
            animation: "spin 2s linear infinite",
          }}
        />

        {/* Punto central */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #9254c9 0%, #b37feb 100%)",
            boxShadow: "0 0 20px rgba(146, 84, 201, 0.4)",
          }}
        />
      </div>

      {/* Texto */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#722ed1",
            letterSpacing: "0.5px",
          }}
        >
          CRM Startup
        </span>
        <span
          style={{
            fontSize: 14,
            color: "#8c8c8c",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {tip}
          <span className="loading-dots">
            <span style={{ animation: "blink 1.4s infinite 0s" }}>.</span>
            <span style={{ animation: "blink 1.4s infinite 0.2s" }}>.</span>
            <span style={{ animation: "blink 1.4s infinite 0.4s" }}>.</span>
          </span>
        </span>
      </div>

      {/* Estilos CSS para animaciones */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes blink {
            0%, 60%, 100% { opacity: 0; }
            30% { opacity: 1; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};
