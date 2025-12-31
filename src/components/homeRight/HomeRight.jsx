import React, { useEffect, useState } from 'react'
import SearchUser from '../searchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card, Box, Typography, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { GetAllUsersAction } from '../../redux/Auth/auth.action'

const HomeRight = ({ auth }) => {
  const dispatch = useDispatch();
  const { allUsers } = auth
  const [popularUsers, setPopularUsers] = useState([]);

  useEffect(() => {
    dispatch(GetAllUsersAction(auth.token))
  }, [dispatch])

  useEffect(() => {
    const getRandomUsers = (count) => {
      const shuffledUsers = [...allUsers].sort(() => 0.5 - Math.random());
      return shuffledUsers.slice(0, count);
    }
    setPopularUsers(getRandomUsers(5))
  }, [allUsers])
  return (
    <Box sx={{ pr: 2 }}>
      <Box sx={{ py: 2 }}>
        <SearchUser />
      </Box>
      <Card sx={{
        p: 2,
        mt: 2,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, opacity: 0.7 }}>Suggestions for you</Typography>
          <Link href="#" underline="none" sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'primary.main', cursor: 'pointer' }}>View All</Link>
        </Box>
        <Box>
          {popularUsers.map((item) => <PopularUserCard user={item} />)}
        </Box>
      </Card>

    </Box>
  )
}

export default HomeRight