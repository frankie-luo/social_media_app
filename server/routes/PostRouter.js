const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

router.route('/').post(PostController.createPost)

router.route('/:id').get(PostController.getPost).put(PostController.updatePost).delete(PostController.deletePost)

router.route('/favorites/:id').put(PostController.likePost)

router.route('/timelines/:id').get(PostController.getTimelinePosts)

module.exports(router)