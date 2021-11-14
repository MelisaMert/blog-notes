import express from "express";
import {getPosts,createPost,getSinglePost,deletePost,updatePost} from "../controllers/posts.js";

const router = express.Router();

// http://localhost:8080/posts/id
// GET POST DELETE UPDATE PATCH

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', createPost)
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;