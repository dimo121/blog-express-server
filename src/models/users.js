const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(value.length < 7){
                throw new Error('password must be at least 7 characters long.')
            }
            if(value.toLowerCase().includes('password')) {
                throw new Error('password may not consist of the word password')
            }
        },
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

},{ 
    timestamps: true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log('testing')
    const token = jwt.sign({ _id: user._id.toString() }, 'secretcharacters')
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    console.log(user)
    await user.save()

    return token
}

userSchema.pre('save', async function (next) {

    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User

