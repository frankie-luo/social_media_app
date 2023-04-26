const { User } = require('./../models')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        })
        res.status(200).json(newUser)
    }

    catch (error) {
        res.status(400).json({ error: error })
    }
    
}

exports.login = async (req, res) => {

    try {
        const foundUser = User.findOne({username: req.body.username})
        if (!foundUser) return res.status(404).json({ error: true })
        const match = await bcrypt.compare(req.body.password, foundUser.password)
        match? res.status(200).json(user): res.status(401).json("Wrong Password")
    }

    catch (error) {
        res.status(400).json({ error: error })
    }

}