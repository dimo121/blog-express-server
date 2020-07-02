const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()
const Blog = require('../models/blog')


router.get('/blogs', auth, async (req,res) => {
    try{
        const blogs = await Blog.find({ owner: req.user._id })

        res.status(200).send(blogs)
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/blogs',auth , async (req,res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id 
    })
    
    try{
        await blog.save()
        
        res.status(201).send(blog)

    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/blogs/entries', auth, async (req,res) => {

    const entryKeys = Object.keys(req.body)
    const allowedFields = ['title','description','createdAt','blog_id']
    const isValidOperation = entryKeys.every((key) => allowedFields.includes(key))


    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid entry fields" })
    }

    try {

        const blog = await Blog.findOne({ _id: req.body.blog_id, owner: req.user._id })

        if(blog.length === 0) {
            return res.status(404).send({ 'message': 'Blog not found' })
        }

        blog.entries = blog.entries.concat(req.body)

        await blog.save()

        res.status(201).send(blog)

    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router