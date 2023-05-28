const { User } = require('../models')
const jwt = require('jsonwebtoken')

exports.getUsers = async (req, res) => {
    try {
        let users = await User.find().limit(20)
        users = users.map(user => {
            const {password, ...other} = user._doc
            return other
        })
        res.status(200).json(users)
    }

    catch (error) {
        res.status(400).json({ error: error })
    }
}

exports.getUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: true })
        const { password, ...userInfo } = user._doc
        res.status(200).json(userInfo);
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}

exports.updateUser = async (req, res) => {

    try {
        if (req.params.id === req.body._id || req.body.isAdmin) {
            if (req.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!updatedUser) return res.status(404).json('User does not exist!')
            const accessToken = jwt.sign({ username: updatedUser.username, id: updatedUser._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
            res.status(200).json({...updatedUser._doc, accessToken})
        } 

        else res.status(403).json("Access Denied! you can only update your own profile")
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}

exports.deleteUser = async (req, res) => {

    try {
        if (req.params.id === req.body._id || req.body.currentUserAdminStatus) {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            console.log(deletedUser)
            if (!deletedUser) return res.status(404).json('User does not exist!')
            res.status(200).json(deletedUser)
        }
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}

exports.followUser = async (req, res) => {

    try {
        if (req.params.id === req.body._id ) return res.status(403).json("Cannot follow yourself!")
        const follower = await User.findById(req.body._id)
        const following = await User.findById(req.params.id)
        if (!follower || !following) return res.status(404).json('User does not exist!')
        if (follower.following.includes(req.params.id)) return res.status(403).json('Already followed!')
        await follower.updateOne({$addToSet: {following: req.params.id}})
        await following.updateOne({$addToSet: {followers: req.body._id}})
        res.status(200).json('Followed!')
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}

exports.unfollowUser = async (req, res) => {

    try {
        if (req.params.id === req.body._id ) return res.status(403).json("Cannot unfollow yourself!")
        const follower = await User.findById(req.body._id)
        const following = await User.findById(req.params.id)
        if (!follower || !following) return res.status(404).json('User does not exist!')
        if (!follower.following.includes(req.params.id)) return res.status(403).json('Not following!')
        await follower.updateOne({$pull: {following: req.params.id}})
        await following.updateOne({$pull: {followers: req.body._id}})
        res.status(200).json('Unfollowed!')
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}