import { Grid, Card, Typography, Box } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
    return (
        <Box sx={{
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            bgcolor: 'background.default',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Ambient Background Elements - Optional: can be theme aware or removed for cleaner look, trying subtle ones */}
            <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(33,150,243,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />
            <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(233,30,99,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />

            <Grid container sx={{ zIndex: 1, maxWidth: '1200px', height: '80vh', px: 2 }}>
                {/* Hero Section (Hidden on mobile) */}
                <Grid item xs={0} md={7} sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', p: 4 }}>
                    <div className="animate-fade-in">
                        <img src="https://plus.unsplash.com/premium_photo-1720287601070-5af3ac75497b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Social Connect"
                            style={{ maxWidth: '80%', filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' }}
                        />
                        <Typography variant="h2" sx={{ mt: 4, fontWeight: 800, background: 'linear-gradient(45deg, #2196f3, #e91e63)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                            Connect. Share. Inspire.
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', mt: 2, maxWidth: '80%' }}>
                            Join millions of people sharing their stories and connecting with friends every day.
                        </Typography>
                    </div>
                </Grid>

                {/* Auth Form Section */}
                <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className="glass-panel animate-fade-in" sx={{ width: '100%', maxWidth: '400px', p: 4, borderRadius: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                Social Media
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Welcome back! Please enter your details.
                            </Typography>
                        </Box>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Authentication