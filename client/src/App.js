import React, {useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
  Grid
} from '@material-ui/core';
import PostsList from './components/PostsList';
import {BrowserRouter as Router, Switch, Routes, Route,Redirect} from 'react-router-dom';
import PenIcon from "@material-ui/icons/Create"
import AddPostForm from '../src/components/AddPostForm';
import PostDetails from '../src/components/PostDetails';
import {fetchPosts} from '../src/actions/post'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(3)
    }
}))

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(()=> {
    dispatch(fetchPosts());
  }, [dispatch])

  const handleOpen = () => {
     setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles();
    return (
     <>
       <CssBaseline />
       <Container maxWidth="lg">
           <AppBar position="static" color="inherit" elevation={0}>
              <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    className={classes.container}
                />
                <Typography
                    variant="h6"
                    color="secondary"
                    className={classes.title}
                  >
                  <a href= {`${window.location.origin}/posts`}>BlogNotes</a>
                </Typography>
                <Button
                   color="primary"
                   variant="outlined"
                   startIcon={<PenIcon/>}
                   onClick={handleOpen}
                >
                   New Post
                </Button>
              </Toolbar>
           </AppBar>
           <Grid  container className={classes.container}>
            <Grid item xs={12}>
               <Router>
                   <Switch>
                     <Route exact path="/posts" component={PostsList}/>
                     <Route exact path="/posts/:id" component={PostDetails}/>
                   </Switch>
                   <Redirect from ="/" to="/posts" />
               </Router>
            </Grid>
          </Grid>
       </Container>

       <AddPostForm open={open} handleClose={handleClose} />
     </>
  )
}

export default App;

// Redirect işlemi ekle

