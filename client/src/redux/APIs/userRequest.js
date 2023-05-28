import axios from "axios"

const API = axios.create({baseURL: 'http://localhost:3001'})

export const getUser = id => API.get(`/users/${id}`)

export const updateUser = (id, data) => API.put(`/users/${id}`, data)

export const followUser = (id, data) => API.post(`/users/following/${id}`, data)

export const unfollowUser = (id, data) => API.delete(`/users/following/${id}`, {data: data})