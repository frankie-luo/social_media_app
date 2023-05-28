import axios from "axios"

const API = axios.create({baseURL: 'http://localhost:3001'})

export const logIn = userAuthData => API.post('/login', userAuthData)

export const signUp = userAuthData => API.post('/signup', userAuthData)