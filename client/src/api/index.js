import axios from 'axios';
 const apiEndPont = "http://localhost:8080/posts";

export const fetchPosts = async () => await axios.get(apiEndPont);

export const fetchSinglePost = async (id) => await axios.get(`${apiEndPont}/${id}`);

export const createPost = async (post) => await axios.post(apiEndPont, post);

export const updatePost = async (id, updatedPost) => await axios.patch(`${apiEndPont}/${id}`, updatedPost);

export const deletePost = async (id) => await axios.delete(`${apiEndPont}/${id}`);




