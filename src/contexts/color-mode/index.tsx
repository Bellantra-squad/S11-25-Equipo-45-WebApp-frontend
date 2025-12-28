import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Magenta,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {        
              colorPrimary:  "rgba(146, 84, 201, 1)",
              fontFamily:  "-apple-system, Inter,  Montserrat, Roboto,  BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          },
          components: {
             Layout: {        
              headerBg: mode === "light" ? "#ffffff" : "#000000",
              headerColor: mode === "light" ? "#1f1f1f" : "#ffffff",
              siderBg: mode === "light" ? "#ffffff" : "#000000",
              footerBg: mode === "light" ? "#ffffff" : "#000000",
            },
            Menu: {
              fontSize: 15,         // Default: 14px → +7%
              iconSize: 18,         // Default: 14px → +28%
              itemHeight: 48,       // Default: 40px → +20%
              subMenuItemBg: "transparent",
            },
            
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
