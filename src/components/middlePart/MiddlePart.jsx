import { Avatar, Card, IconButton, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../post/PostCard';
import CreatePostModal from '../createPost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../redux/Post/post.action';

const story = [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// const posts = [1, 1, 1, 1, 1] 
const MiddlePart = () => {
  const dispatch = useDispatch()
  const { post, auth } = useSelector(Store => Store)
  // console.log("post store",post)
  const handleClose = () => setOpenCreatePostModal(false);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true)
    console.log("open post model...")
  }
  useEffect(() => {
    dispatch(getAllPostAction())
  }, [post.newComment])

  return (
    <Box sx={{ width: '100%', maxWidth: '700px', mx: 'auto' }}>
      <section className='flex items-center p-5 rounded-b-md overflow-x-scroll no-scrollbar' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
              .no-scrollbar::-webkit-scrollbar {
                  display: none;
              }
          `}
        </style>
        <div className="flex flex-col items-center mr-4 cursor-pointer min-w-[5rem] flex-shrink-0">
          <Avatar
            sx={{ width: "5rem", height: "5rem", border: '2px solid #2196f3' }}
          >
            <AddIcon sx={{ fontSize: '3rem' }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item) => <StoryCircle />)}
      </section>
      <Card sx={{ p: 2, mt: 5 }}>
        <div className='flex justify-between items-center'>
          <Avatar src={auth.user?.profilePicture} />
          <input readOnly style={{ border: 'none', outline: 'none' }} className='w-[90%] bg-slate-100/5 rounded-full px-5 py-3 bg-transparent text-white hover:bg-slate-100/10 transition-all cursor-pointer'
            type="text" placeholder="Start a post..." onClick={handleOpenCreatePostModel} />
        </div>
        <div className='flex justify-center mt-5 opacity-80 overflow-x-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>
            {`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className='flex space-x-9 min-w-max px-2'>
            <div className='flex items-center '>
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <ImageIcon />
              </IconButton>
              <span>Media</span>
            </div>
            <div className='flex items-center '>
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <VideocamIcon />
              </IconButton>
              <span>Video</span>
            </div>
            <div className='flex items-center '>
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <ArticleIcon />
              </IconButton>
              <span>Article</span>
            </div>
          </div>
        </div>
      </Card>
      <div className='mt-5 space-y-5'>
        {post.posts.map((item) => <PostCard item={item} />)}
      </div>
      <section>
        <CreatePostModal open={openCreatePostModal} handleClose={handleClose} />
      </section>
    </Box>
  )
}

export default MiddlePart