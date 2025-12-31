import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./DarkTheme";
import { lightTheme } from "./LightTheme";

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    mode: 'dark',
});

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode,
        }),
        [mode],
    );

    const theme = useMemo(
        () => (mode === 'light' ? lightTheme : darkTheme),
        [mode],
    );

    useEffect(() => {
        if (mode === 'dark') {
            document.body.style.background = 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)';
            document.body.style.color = '#F1F5F9';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #a8c0ff 0%, #c2e9fb 100%)';
            document.body.style.color = '#1E293B';
        }
    }, [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
