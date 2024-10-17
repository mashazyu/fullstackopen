const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  author: String,
  url: {
    type: String,
    required: true // This makes the username field required
  },
  likes: {
    type: Number,
    default: 0 // Default value if not provided
  },
})
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Blog', blogSchema)