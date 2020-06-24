const cors = require('cors')
const express = require('express')
require('./db/mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./routes/blogs')
const userRouter = require('./routes/users')


const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept")
    next()
})

app.use(blogsRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('Server is up on port: '+port)
})