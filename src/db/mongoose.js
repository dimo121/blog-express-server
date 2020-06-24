const mongoose = require('mongoose')
const connectionURL = 'mongodb://127.0.0.1/myblog-db'

mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
    useCreateIndex: true
})

