require('dotenv').config()
const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")


const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization
   
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // if we have eblity to delete user we have to make sure the user in our database
        req.user = {userID: payload.userID, userName: payload.userName}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth