const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req,res,next) => {

    try {
    
        const token = req.header('Authorization').replace('Bearer ','')
    
        const decoded = await jwt.verify(token,'secretcharacters')
    
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })

        if(!user){
            throw new Error()
        }

        //set request to pass on to the route handler
        req.token = token

        req.user = user

        next()

    } catch(e) {
        res.status(401).send({ error: 'Please authenticate' })
    }

}

module.exports = auth