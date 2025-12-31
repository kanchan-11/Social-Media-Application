import { Avatar, Button, CardHeader, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const PopularUserCard = ({ user }) => {
  return (
    <div className='flex items-center justify-between py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-2 transition-all cursor-pointer'>
      <div className='flex items-center gap-3'>
        <Avatar src={user?.profilePicture || ''} sx={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          width: 40,
          height: 40,
          border: '2px solid',
          borderColor: 'divider'
        }} aria-label="recipe">
          {user.firstName[0]}
        </Avatar>
        <div className='flex flex-col'>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.2, fontWeight: 600 }}>{user.firstName + " " + user.lastName}</Typography>
          <Typography variant="caption" color="text.secondary">{"@" + user.firstName.toLowerCase() + "_" + user.lastName.toLowerCase()}</Typography>
        </div>
      </div>
      <Button size='small' variant="text" sx={{ textTransform: 'none', minWidth: 'auto', fontWeight: 600 }}>
        Follow
      </Button>
    </div>
  )
}

export default PopularUserCard