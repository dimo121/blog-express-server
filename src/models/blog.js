const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    entries: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        createdAt: {
            type: String,
            required: true
        },
        blog_id: {
            type: String,
            required: true
        }
    }],
    owner: {
        type: String,
        required: true
    }
})

blogSchema.methods.toJSON = function () {
    const blog = this
    const blogObject = blog.toObject()

    blogObject.id = blogObject._id

    delete blogObject._id

    if (blogObject.entries) {
        blogObject.entries.map((item) => {
            item.id = item._id
            delete item._id
        })
    }    

    return blogObject
}


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog