import React from 'react'
import { SidebarNavigationMenu } from './SidebarNavigationMenu'
import { Avatar, Divider, Menu, MenuItem, Button, Card, Box, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Store from '../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../redux/Auth/auth.action';

import { ColorModeContext } from '../../theme/ThemeContext';
import { useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Sidebar = ({ handleClose }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(Store => Store)
  const navigate = useNavigate()
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutUserAction())
    handleMenuClose()
  }
  const handleProfile = () => {
    handleMenuClose()
    if (handleClose) handleClose();
    const userId = auth.user?.id ?? 'fallback-id';
    navigate(`/profile/${userId}`)
  }
  const handleNavigate = (item) => {
    if (handleClose) handleClose();
    if (item.title === "Profile") {
      const userId = auth.user?.id ?? 'fallback-id';
      navigate(`/profile/${userId}`)
    }
    else {
      navigate(item.path)
    }
  }

  const profilePicUrl = auth.user?.profilePicture ?
    auth.user.profilePicture
    : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
  return (
    <Card sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      py: 5,
      borderRadius: 0,
      backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 29, 45, 0.5)',
      backdropFilter: 'blur(10px)',
      borderRight: mode === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
      boxShadow: 'none'
    }}>
      <Box sx={{
        pl: 3,
        pr: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: 1,
        overflowY: 'auto',
        minHeight: 0,
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #2196f3, #e91e63)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Social Media
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {SidebarNavigationMenu.map((item) =>
            <Box onClick={() => handleNavigate(item)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, '&:hover': { color: 'primary.main' } }}>
              {item.icon}
              <Typography variant="h6" sx={{ fontSize: '1.2rem', color: mode === 'light' ? 'text.secondary' : 'inherit' }}>{item.title}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Box sx={{ pl: 3, pr: 3, pb: 2 }}>
          <Box onClick={toggleColorMode} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, '&:hover': { color: 'primary.main' } }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon sx={{ color: mode === 'light' ? 'text.secondary' : 'inherit' }} />}
            <Typography variant="h6" sx={{ fontSize: '1.2rem', color: mode === 'light' ? 'text.secondary' : 'inherit' }}>
              {mode === 'dark' ? "Light Theme" : "Dark Theme"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ pl: 3, pr: 2, pt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={profilePicUrl} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: mode === 'light' ? 'text.primary' : 'inherit' }}>{auth.user?.firstName + " " + auth.user?.lastName}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, color: mode === 'light' ? 'text.secondary' : 'inherit' }}>@{auth.user?.firstName?.toLowerCase() + "_" + auth.user?.lastName?.toLowerCase()}</Typography>
            </Box>
          </Box>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ minWidth: 0, color: mode === 'light' ? 'text.primary' : 'inherit' }}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Card>
  )
}

export default Sidebar