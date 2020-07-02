const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()
const User = require('../models/users')

router.post('/users', async (req,res) => {
    const user = await new User(req.body)
    
    try{    
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try{
        console.log('start')
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()

        res.send( { user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

/*
//route disabled, user login enabled

router.get('/users', async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
    
})
*/

router.get('/users/me', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user._id)
        
        if(!user){
            return res.status(404).send({"message" : "user not found"})
        }

        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router