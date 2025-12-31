import { Grid, Drawer, Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation, Routes, Route } from 'react-router-dom'
import MiddlePart from '../../components/middlePart/MiddlePart'
import CreateReelsForm from '../../components/reels/CreateReelsForm'
import Reels from '../../components/reels/Reels'
import Profile from '../profile/Profile'
import HomeRight from '../../components/homeRight/HomeRight'
import { useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu';
import SearchUser from '../../components/searchUser/SearchUser';

const HomePage = () => {
    const location = useLocation();
    const { pathname } = location;
    const centerGridColumns = pathname === "/" ? 6 : 9;
    const { auth } = useSelector(Store => Store)
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Mobile Hamburger Menu */}
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'space-between', alignItems: 'center', p: 2, position: 'sticky', top: 0, zIndex: 50, bgcolor: 'background.paper', backdropFilter: 'blur(10px)' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{ width: '60%' }}>
                    <SearchUser handleClick={() => { }} />
                </div>
            </Box>

            {/* Mobile Sidebar Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '80%', maxWidth: 300, bgcolor: 'transparent', border: 'none' },
                }}
            >
                <Sidebar handleClose={handleDrawerToggle} />
            </Drawer>

            <Grid container spacing={0} sx={{ width: '100%' }}>
                <Grid item xs={0} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
                    <div className='sticky top-0 w-full'>
                        <Sidebar />
                    </div>
                </Grid>

                <Grid item xs={12} lg={centerGridColumns} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="w-full px-2 lg:px-5">
                        <Routes>
                            <Route path="/*" element={<MiddlePart />} />
                            <Route path="/reels" element={<Reels />} />
                            <Route path="/create-reels" element={<CreateReelsForm />} />
                            <Route path="/profile/:id" element={<Profile />} />
                        </Routes>
                    </div>
                </Grid>

                {location.pathname === '/' &&
                    <Grid item xs={0} lg={3} sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative' }}>
                        <div className='sticky top-0 w-full'>
                            <HomeRight auth={auth} />
                        </div>
                    </Grid>}
            </Grid>
        </Box>
    )
}

export default HomePage