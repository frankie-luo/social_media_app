import axios from "axios"

const API = axios.create({baseURL: 'http://localhost:3001'})

export const getTimelinePosts = id => API.get(`/posts/timelines/${id}`)

export const likePost = (id, userId) => API.put(`posts/favorites/${id}`, {userId: userId})