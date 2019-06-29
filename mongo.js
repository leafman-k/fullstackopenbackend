const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://trainer:${password}@fullstackopen-mvn2c.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, {useNewUrlParser: true})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)


if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(response => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}


