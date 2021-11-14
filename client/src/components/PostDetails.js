import React, { useEffect, useState } from 'react'
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Divider,
    Button,
    Chip
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import noImage from "../images/noimage.svg";
import { fetchSinglePost, deletePost } from '../actions/post';
import EditPostForm from './EditPostForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(8)
    },
    header: {
        display: "flex",
        justifyContent: "space-between"
    },
    content: {
        marginTop: theme.spacing(3)
    },
    image: {
        width: "100%",
        borderRadius: 5,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    },
    chip: {
        marginTop: theme.spacing(1)
    }
}));

const PostDetails = ({ match, history, location }) => {

    const convertRelativeTime = date => {
        return moment(date).fromNow();
    }
    const dispatch = useDispatch();
    const { id } = match.params;
    const classes = useStyles();

    //redux store üzerinden currentPost verisine erişebilriiz
    const currentPost = useSelector(state => state.posts.currentPost);

    const [editMode, setEditMode] = useState(false);

    const OpenEditMode = () => {
        setEditMode(true);
    }

    const closeEditMode = () => {
        setEditMode(false)
    }

    useEffect(() => {
        dispatch(fetchSinglePost(id));
    }, [dispatch]);

    const removePost = () => {
        dispatch(deletePost(currentPost._id));
        history.push("/posts")
    }
    return (
        <Paper className={classes.paper} elevation={0}>
            {
                editMode ? (
                   <EditPostForm post={currentPost} closeEditMode={closeEditMode}/>) : (<>
                    <div>
                        <div className={classes.header}>
                            <Typography variant="h5" gutterBottom>
                                {currentPost?.title}
                            </Typography>
                            <div>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    startIcon={<EditIcon />}
                                    onClick={OpenEditMode}
                                >
                                    Edit
                                </Button> {" "}
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    onClick={removePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <Typography variant="overline" gutterBottom>
                        {currentPost?.subTitle}
                    </Typography>
                    <Typography variant="caption" component="p">
                        {convertRelativeTime(currentPost?.createdAt)} by Melisa Mert
                    </Typography>
                    <Chip
                        className={classes.chip}
                        variant="outlined"
                        label={`# ${currentPost?.tag}`}
                    />
                    <div className={classes.content}>
                        <img
                            className={classes.image}
                            src={currentPost?.image || noImage}
                            alt="Post"
                        />
                        <Typography variant="body1">
                            {currentPost?.content}
                        </Typography>
                    </div>









                </>)
            }
        </Paper>
    )
}

export default PostDetails;
