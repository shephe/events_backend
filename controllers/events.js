const express = require('express')
const router = express.Router()
const Event = require('../models/events.js')

//Create
router.post('/', async (req, res) => {
    try{
        const createdEvent = await Event.create(req.body)
        res.status(200).json(createdEvent)
    }
    catch(error){
        res.status(400).json(error)
    }
})

//Get
router.get('/', async (req, res) => {
    try{
        const events = await Event.find({})
        res.status(200).json(events)
    }catch(error){
        res.status(400).json(error)
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try{
        const deletedEvent = await Event.findByIdAndRemove(req.params.id)
        res.status(200).json(deletedEvent)
    }catch(error){
        res.status(400).json(error)
    }
})

//Update
router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedEvent);
    }catch(error) {
        res.status(400).json(error)
    }
})


module.exports = router