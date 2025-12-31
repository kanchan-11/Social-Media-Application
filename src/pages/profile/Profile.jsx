import { Avatar, Box, Button, Card, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/post/PostCard';
import UserReelCard from '../../components/reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './profileModal';
import { getUsersPostAction } from '../../redux/Post/post.action'
import { GetUserProfileAction } from '../../redux/Auth/auth.action';

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
]
// const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1]
// // const savedPosts = [1, 1, 1]

const Profile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { auth, post } = useSelector(Store => Store)
  const { userPosts } = post
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModel = () => setOpen(true)
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(GetUserProfileAction(auth.jwt))
    dispatch(getUsersPostAction(id))
  }, [dispatch, auth.jwt, id])
  const [value, setValue] = React.useState('post')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const profilePicUrl = auth.user?.profilePicture ?
    auth.user.profilePicture
    : 'https://cdn-icons-png.flaticon.com/128/892/892758.png'


  return (
    <Card sx={{ width: { xs: '100%', lg: '80%' }, mx: 'auto', mt: { xs: 2, md: 4 }, borderRadius: { xs: 0, md: 4 }, overflow: 'visible' }}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ height: { xs: '8rem', md: '15rem' }, overflow: 'hidden', borderRadius: { xs: 0, md: '16px 16px 0 0' } }}>
          <img src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ px: { xs: 2, md: 5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Avatar
              sx={{
                width: { xs: "6rem", md: "10rem" },
                height: { xs: "6rem", md: "10rem" },
                border: '4px solid',
                borderColor: 'background.paper',
                transform: { xs: 'translateY(-30%)', md: 'translateY(-50%)' }
              }}
              src={profilePicUrl}
            />
            <Box sx={{ mt: { xs: 0, sm: 2 }, width: { xs: '100%', sm: 'auto' }, display: { xs: 'none', sm: 'block' } }}>
              {true ? <Button
                sx={{ borderRadius: "20px", px: 4 }}
                variant="outlined"
                onClick={handleOpenProfileModel}>
                Edit Profile
              </Button>
                : <Button
                  sx={{ borderRadius: "20px", px: 4 }}
                  variant="outlined">
                  Follow
                </Button>
              }
            </Box>
          </Box>
        </Box>
        <Box sx={{ px: { xs: 2, md: 5 }, mt: { xs: -3, md: -5 }, mb: { xs: 2, md: 4 } }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>{auth.user?.firstName + " " + auth.user?.lastName}</Typography>
            <Typography variant="body2" color="text.secondary">@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</Typography>
          </Box>

          {/* Mobile Edit Profile Button */}
          <Box sx={{ mt: 2, display: { xs: 'block', sm: 'none' } }}>
            {true ? <Button
              sx={{ borderRadius: "20px", px: 4, width: '100%' }}
              variant="outlined"
              onClick={handleOpenProfileModel}>
              Edit Profile
            </Button>
              : <Button
                sx={{ borderRadius: "20px", px: 4, width: '100%' }}
                variant="outlined">
                Follow
              </Button>
            }
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, my: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}><strong>{userPosts.length}</strong> posts</Typography>
            <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}><strong>35</strong> followers</Typography>
            <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}><strong>5</strong> followings</Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>About me my username about me my keyline about me my username my keyline</Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
              centered={false}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minWidth: { xs: 'auto', md: 90 },
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }
              }}
            >
              {tabs.map((item) => <Tab key={item.value} value={item.value} label={item.name} />)}
            </Tabs>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: { xs: 1, md: 2 } }}>
            {value === 'post' ?
              (<Box sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {userPosts.map((item) => (
                  <PostCard key={item.id} item={item} />
                ))}
              </Box>)
              : value === 'reels' ?
                (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                  {reels.map((item, index) => <UserReelCard key={index} />)}
                </Box>)
                : value === 'saved' ?
                  (<Box sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {userPosts.map((item) => (
                      <PostCard key={item.id} item={item} />
                    ))}
                  </Box>)
                  : value === 'repost' ?
                    (<div>Repost</div>)
                    : ""
            }
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default Profile