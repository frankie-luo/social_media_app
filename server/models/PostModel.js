const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reference = Schema.Types.ObjectId

const PostSchema = new Schema({
    userId: { type: reference, ref: 'User', required: true },
    desc: String,
    likes: [],
    image: String,
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post