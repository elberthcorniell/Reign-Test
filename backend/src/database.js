const mongoose = require('mongoose')
let db
let connect = () => {
    mongoose.connect('mongodb://mongo/reigndb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    db = mongoose.connection
    db.on('error', () => { 
        connect()
     })
    db.once('open', () => { console.log('db connected') })
}
connect()
module.exports = db