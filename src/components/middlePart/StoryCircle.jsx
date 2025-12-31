import { Avatar, Typography } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
  return (
    <div className="flex flex-col items-center mr-4 cursor-pointer min-w-[5rem] flex-shrink-0">
      <Avatar
        sx={{ width: "5rem", height: "5rem" }}
        src="https://www.kindpng.com/picc/m/24-248325_profile-picture-circle-png-transparent-png.png"
      >

      </Avatar>
      <Typography variant="body2" sx={{ fontSize: '0.8rem', mt: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '5rem' }}>User Name</Typography>
    </div>
  )
}

export default StoryCircle