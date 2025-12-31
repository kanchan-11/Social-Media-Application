import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddIcon from '@mui/icons-material/Add';
import { uploadToCloudinary } from '../../utils/UploadToCloud';
import { createPostAction } from '../../redux/Post/post.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "16px", // Softer corners
  outline: "none",
  border: '1px solid',
  borderColor: 'divider',
};

const CreatePostModal = ({ open, handleClose }) => {

  const { auth } = useSelector(Store => Store)
  const [selectedImage, setSelectedImage] = useState()
  const [selectedVideo, setSelectedVideo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSelectImage = async (event) => {
    setIsLoading(true)
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image")
    setSelectedImage(imageUrl)
    setIsLoading(false)
    formik.setFieldValue("image", imageUrl)
  }
  const handleSelectVideo = async (event) => {
    setIsLoading(true)
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video")
    setSelectedVideo(videoUrl)
    setIsLoading(false)
    formik.setFieldValue("video", videoUrl)
  }
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      vdeo: ""
    },
    onSubmit: (values) => {
      console.log("formik values-----", values)
      dispatch(createPostAction(values))
      handleClose()
    }
  })
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: 'blur(5px)' } // Blur effect behind modal
      }}
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">Create New Post</Typography>
            <IconButton onClick={handleClose} size="small"><AddIcon sx={{ transform: 'rotate(45deg)' }} /></IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Avatar src={auth.user?.profilePicture} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{auth.user?.firstName + " " + auth.user?.lastName}</Typography>
              <Typography variant="caption" color="text.secondary">@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</Typography>
            </Box>
          </Box>

          <textarea
            name="caption"
            placeholder="What's on your mind?"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              resize: 'none',
              fontSize: '1.2rem',
              color: 'inherit',
              marginBottom: '1rem',
              fontFamily: 'inherit'
            }}
            rows={4}
            value={formik.values.caption}
            onChange={formik.handleChange}
          />

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {/* Media Selection Area */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'primary.main' }}>
              <Box>
                <input type="file" accept='image/*' onChange={handleSelectImage} style={{ display: "none" }} id="image-input" />
                <label htmlFor='image-input'>
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
              </Box>
              <Box>
                <input type="file" accept='video/*' onChange={handleSelectVideo} style={{ display: "none" }} id="video-input" />
                <label htmlFor='video-input'>
                  <IconButton color="primary" component="span">
                    <VideocamIcon />
                  </IconButton>
                </label>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>Add to your post</Typography>
          </Box>

          {selectedImage && <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', maxHeight: 300 }}>
            <img src={selectedImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>}
          {selectedVideo && <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', maxHeight: 300 }}>
            <video src={selectedVideo} controls style={{ width: '100%', height: '100%' }} />
          </Box>}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ borderRadius: "20px", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: "20px", px: 4, textTransform: "none" }}
              disabled={!formik.values.caption && !selectedImage && !selectedVideo}
            >
              Post
            </Button>
          </Box>
        </form>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  )
}

export default CreatePostModal