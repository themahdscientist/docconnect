const router = require('express').Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    auth = require('../middlewares/auth'),
    User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(202).send({ msg: 'Record already exists', info: true })

        req.body.password = await bcrypt.hash(req.body.password, 10)
        await (new User(req.body)).save()
        res.status(201).send({ msg: 'New user created', success: true })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error creating user', success: false })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(202).send({ msg: 'Record does not exist', info: true })

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(202).send({ msg: 'Invalid credentials', info: true })

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1d' })
        res.status(200).send({ msg: 'Login successful', success: true, _token: token })
    } catch (err) {
        res.status(500).send({ msg: 'Login error', success: false })
    }
})

router.post('/authz', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        if (!user) return res.status(202).send({ msg: 'User does not exists', info: true })

        user.password = undefined
        res.status(200).send({ msg: 'User exists', success: true, user: { ...user._doc } })
    } catch (err) {
        return res.status(500).send({ msg: 'Error getting user info', success: false })
    }
})
module.exports = router