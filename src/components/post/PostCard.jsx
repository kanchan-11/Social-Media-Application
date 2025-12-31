import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography, Box, InputBase } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../redux/Post/post.action';
import { isLikedByUser } from '../../utils/isLikedByUser';

const PostCard = ({ item }) => {
  const dispatch = useDispatch()
  const { post, auth } = useSelector(Store => Store)
  const [showComments, setShowComments] = useState(false)
  const isItemLikedByUser = item && auth && isLikedByUser(auth.user.id, item);
  const handleShowComment = () => setShowComments(!showComments)
  const handleCreateCommnet = (content) => {
    const reqdata = {
      postId: item.id,
      data: {
        content
      }
    }
    dispatch(createCommentAction(reqdata))
  }
  const handleLikePost = () => {
    dispatch(likePostAction(item.id))
  }
  // console.log("is liked: ",isItemLikedByUser)
  return (
    <Card sx={{ mb: 2, borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
      {item && <CardHeader
        avatar={
          <Avatar src={item.user?.profilePicture || ""}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: 40,
              height: 40,
              border: '2px solid',
              borderColor: 'divider'
            }}
            aria-label="recipe">
            {item.user?.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" fontWeight="600">
            {item.user?.firstName + " " + item.user?.lastName}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {"@" + item.user?.firstName?.toLowerCase() + " " + item.user?.lastName?.toLowerCase()}
          </Typography>
        }
        sx={{ pb: 1 }}
      />}

      {item?.caption && <CardContent sx={{ py: 1, pt: 0 }}>
        <Typography variant="body1" color="text.primary" sx={{ fontSize: '0.95rem' }}>
          {item?.caption}
        </Typography>
      </CardContent>}

      {
        item &&
        item.image &&
        (<Box sx={{ position: 'relative', width: '100%', maxHeight: '500px', overflow: 'hidden', bgcolor: 'black' }}>
          <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={item.image} alt="" />
        </Box>)
      }

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            onClick={handleLikePost}
            sx={{
              borderRadius: '12px',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(244, 67, 54, 0.1)',
                color: 'error.main',
                transform: 'scale(1.05)'
              }
            }}
          >
            {isItemLikedByUser ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '12px',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(33, 150, 243, 0.1)',
                color: 'primary.main',
                transform: 'scale(1.05)'
              }
            }}
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={handleShowComment}
            sx={{
              borderRadius: '12px',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(76, 175, 80, 0.1)',
                color: 'success.main',
                transform: 'scale(1.05)'
              }
            }}
          >
            <ChatBubbleIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            sx={{
              borderRadius: '12px',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(255, 193, 7, 0.1)',
                color: 'warning.main',
                transform: 'scale(1.05)'
              }
            }}
          >
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </CardActions>
      {showComments && <section>
        <Divider sx={{ mx: 2, my: 1, borderColor: 'rgba(0,0,0,0.05)' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <InputBase
            fullWidth
            placeholder='Write a comment...'
            sx={{
              bgcolor: 'action.hover',
              borderRadius: '20px',
              px: 2,
              py: 1,
              fontSize: '0.9rem'
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateCommnet(e.target.value)
                e.target.value = ""
              }
            }} />
        </Box>
        <Box sx={{ px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '300px', overflowY: 'auto' }}>
          {item.comments?.map((comment) => (
            <Box key={comment.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar sx={{ width: 28, height: 28, fontSize: '0.8rem' }}>{comment.user.firstName[0]}</Avatar>
              <Box sx={{ bgcolor: 'action.hover', p: 1.5, borderRadius: '0 12px 12px 12px', minWidth: '150px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{comment.user.firstName} {comment.user.lastName}</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.primary' }}>{comment.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </section>}
    </Card>
  )
}

export default PostCard