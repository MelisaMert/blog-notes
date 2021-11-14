import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from 'react-file-base64';
import {createPost} from '../actions/post';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(2)
    }
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.mixed().oneOf(tags)
});

const AddPostForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const classes = useStyles();
    const { register, handleSubmit, control, errors, reset } = useForm({
        resolver: yupResolver(postSchema)
    })

    const onSubmit = (data) => {
        dispatch(createPost({...data,image: file}));
        clearForm();
    }

    const clearForm = () => {
        reset();
        setFile(null);
        handleClose();
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill following form to create a new post.
                    </DialogContentText>
                    <div className={classes.root}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="title"
                                label="Title"
                                name="title"
                                variant="outlined"
                                className={classes.textField}
                                size="small"
                                {...register("title", { required: true })}
                                error={(errors && errors.title) ? true : false}
                                fullWidth
                            />
                            <TextField
                                id="subtitle"
                                label="Sub Title"
                                name="subtitle"
                                variant="outlined"
                                className={classes.textField}
                                size="small"
                                {...register("subtitle", {
                                    required: true,
                                })}
                                error={(errors && errors.subtitle) ? true : false}
                                fullWidth
                            />
                            <Controller
                                control={control}
                                name="tag"
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (
                                    <Select
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        inputRef={ref}
                                        className={classes.textField}
                                        fullWidth
                                        input={<Input id="name" />}
                                        defaultValue={"science"}
                                    >
                                        {tags.map((tag, index) => (

                                            <MenuItem key={index} value={tag}>
                                                {tag}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                )}
                            />
                            <TextField
                                id="content"
                                label="Content"
                                name="content"
                                variant="outlined"
                                multiline
                                rows={4}
                                className={classes.textField}
                                size="small"
                                {...register("content", {
                                    required: true,
                                })}
                                error={(errors && errors.content) ? true : false}
                                fullWidth
                            />

                            <FileBase64
                                multiple={false}
                                onDone={({ base64 }) => setFile(base64)}
                            />

                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="inherit"
                        onClick={clearForm}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => handleSubmit(onSubmit)()}
                        color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddPostForm;
