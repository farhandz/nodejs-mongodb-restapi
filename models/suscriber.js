const mongoose = require('mongoose')

const SuscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    suscribeToChanel:{
        type: String,
        required: true
    },
    suscribeDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('SuscriberSchema', SuscriberSchema)