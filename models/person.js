const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3},
    number: { type: String, required: true, minlength: 8}
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
phonebookSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', phonebookSchema)