const { Post, User } = require('../models')
const mongoose = require('mongoose')

exports.getPost = async (req, res) => {

  try {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) return res.status(404).json('Post does not exist!')
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.createPost = async (req, res) => {
  
    try {
      const newPost = await Post.create(req.body)
      res.status(200).json(newPost)
    } 
    catch (error) {
      res.status(400).json(error)
    }

}

exports.updatePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json('Post does not exist!')
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden")
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.deletePost = async (req, res) => {
  const id = req.params.id
  const { userId } = req.body

  try {
    const post = await Post.findById(id)
    if (!post) return res.status(404).json('Post does not exist!')
    if (post.userId === userId) {
      await post.deleteOne()
      res.status(200).json("POst deleted successfully")
    } else {
      res.status(403).json("Action forbidden")
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.likePost = async (req, res) => {
  const id = req.params.id
  const { userId } = req.body

  try {
    const post = await Post.findById(id)
    if (!post) return res.status(404).json('Post does not exist!')
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } })
      res.status(200).json("Post liked")
    } else {
      await post.updateOne({ $pull: { likes: userId } })
      res.status(200).json("Post Unliked")
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.getTimelinePosts = async (req, res) => {
  const userId = req.params.id

  try {
    const currentUserPosts = await Post.find({ userId: userId })
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ])

    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
      .sort((a,b)=>{
          return b.createdAt - a.createdAt
      })
      )
  } catch (error) {
    res.status(400).json(error)
  }
}

