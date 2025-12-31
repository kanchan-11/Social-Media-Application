import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4F46E5", // Modern indigo
        },
        secondary: {
            main: "#EC4899", // Vibrant pink
        },
        background: {
            default: "#F8FAFC", // Very light blue-gray
            paper: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
        },
        text: {
            primary: "#1E293B",
            secondary: "#64748B",
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
            main: "#3B82F6",
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
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Enhanced glass effect
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    '&:hover': {
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                    }
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(10px)',
                        '& fieldset': {
                            borderColor: 'rgba(100, 116, 139, 0.2)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(100, 116, 139, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#4F46E5',
                        },
                    }
                }
            }
        }
    },
});
