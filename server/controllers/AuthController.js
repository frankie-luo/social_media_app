const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {

    try {
        const exist = await User.findOne({username: req.body.username})
        if (exist) return res.status(400).json({message: 'User already exists'})
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })
        const accessToken = jwt.sign({ username: user.username, id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.status(200).json({ ...user._doc, accessToken})
    }

    catch (error) {
        res.status(400).json({ error: error })
    }
    
}

exports.login = async (req, res) => {

    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) return res.status(404).json({ error: true })
        const match = await bcrypt.compare(req.body.password, user.password)   
        if (!match) return res.status(401).json("Wrong Password")
        const accessToken = jwt.sign({ username: user.username, id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.status(200).json({...user._doc, accessToken})
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}