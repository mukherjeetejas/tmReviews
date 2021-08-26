import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from "./styles.js"
import { createPost, updatePost } from '../../actions/posts.js';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ producer: '', title: '', review: '', genres: '', selectedFile: '' });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null))
    const clear = () => {
      setCurrentId(null);
      setPostData({ producer: '', title: '', review: '', genres: '', selectedFile: '' })
    };
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentId) {
        dispatch(updatePost(currentId, postData))
      }
      else {
      dispatch(createPost(postData))
    }
    clear();
    };

    return (
        <Paper className={classes.paper}>

          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

            <Typography variant="h6">{currentId?'EDIT':'ADD'} A REVIEW</Typography>

            <TextField name="producer" variant="outlined" label="producer" fullWidth value={postData.producer} onChange={(e) => setPostData({ ...postData, producer: e.target.value })} />

            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

            <TextField name="review" variant="outlined" label="review" fullWidth multiline rows={4} value={postData.review} onChange={(e) => setPostData({ ...postData, review: e.target.value })} />

            <TextField name="genres" variant="outlined" label="genres (coma separated)" fullWidth value={postData.genres} onChange={(e) => setPostData({ ...postData, genres: e.target.value.split(',') })} />

            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
      );
    };
    
    export default Form;