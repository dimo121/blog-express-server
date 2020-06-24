const express = require('express')
const router = new express.Router()
const Blog = require('../models/blog')


router.get('/blogs', async (req,res) => {
    try{
        const blogs = await Blog.find({})

        res.status(200).send(blogs)
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/blogs', async (req,res) => {
    try{
        const blog = new Blog(req.body)
        await blog.save()
        
        res.status(201).send(blog)

    } catch(e) {
        res.status(400).send()
    }
})

router.post('/blogs/:id/entries', async (req,res) => {

    const entryKeys = Object.keys(req.body)
    const allowedFields = ['title','description','createdAt','blog_id']
    const isValidOperation = entryKeys.every((key) => allowedFields.includes(key))

    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid entry fields" })
    }

    try {
        const blog = await Blog.findById(req.params.id)

        blog.entries = blog.entries.concat(req.body)

        console.log(req.body)

        await blog.save()

        console.log(blog.entries)

        res.status(201).send(blog)

    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router