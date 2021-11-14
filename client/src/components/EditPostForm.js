import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from 'react-file-base64';
import {updatePost} from '../actions/post';

const useStyles = makeStyles(theme => ({
    textField: {
        marginBottom: theme.spacing(2)
    },
    buttons: {
        marginTop: theme.spacing(2)
    }
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.mixed().oneOf(tags)
});

const EditPostForm = ({ history, post, closeEditMode }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(post?.image);
    const classes = useStyles();

    const { register, handleSubmit, control, errors, reset } = useForm({
        resolver: yupResolver(postSchema)
    })

    const onSubmit = (data) => {
        const updatedPost = {
            _id: post._id,
            ...data,
            image: file
        }
        dispatch(updatePost(post._id, updatedPost));
        reset();
        setFile(null);
        closeEditMode()
    }

    return (
        <div>

            <div>
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
                        defaultValue={post?.title}
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
                        defaultValue={post?.subtitle}
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
                                defaultValue={post?.tag}
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
                        defaultValue={post?.content}
                    />

                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => setFile(base64)}
                    />
                    <div className={classes.buttons}>
                        <Button color="secondary" variant="outlined" onClick={closeEditMode}>
                            Cancel
                        </Button>{" "}
                        <Button color="primary" variant="outlined" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPostForm;
