import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3B82F6", // Bright modern blue
        },
        secondary: {
            main: "#EC4899", // Vibrant pink
        },
        background: {
            default: "#0F172A", // Deep slate
            paper: "rgba(30, 41, 59, 0.8)", // Semi-transparent slate
        },
        text: {
            primary: "#F1F5F9",
            secondary: "rgba(241, 245, 249, 0.7)",
        },
        success: {
            main: "#10B981",
        },
        error: {
            main: "#EF4444",
        },
        warning: {
            main: "#F59E0B",
        },
        info: {
            main: "#06B6D4",
        }
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: { fontSize: "2.5rem", fontWeight: 700 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        body1: { fontSize: "1rem", lineHeight: 1.5 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(30, 41, 59, 0.6)", // Enhanced glass effect
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "10px 24px",
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                    '&:hover': {
                        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.6)",
                    }
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: 'rgba(30, 41, 59, 0.6)',
                        backdropFilter: 'blur(10px)',
                        '& fieldset': {
                            borderColor: 'rgba(148, 163, 184, 0.2)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(148, 163, 184, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#3B82F6',
                        },
                    }
                }
            }
        }
    },
});