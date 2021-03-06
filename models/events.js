const {Schema, model} = require('mongoose')

const eventSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    address: String,
    startTime: {type: Date, required: true},
    endTime: Date,
    occasion: String,
    keywords: [String],
    type: String,
    price: Number
})

const Event = model('event', eventSchema);
module.exports = Event;