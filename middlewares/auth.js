const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
    try {
        let token = req.headers['authorization']
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) return res.status(401).send({ msg: 'AuthZ failed', success: false })

            req.userId = decoded.id
            next()
        })
    } catch (err) {
        return res.status(401).send({ msg: 'AuthZ failed', success: false })
    }
}