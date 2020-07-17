const express = require('express')
const router = express.Router()
const Suscriber = require('../models/suscriber')

// router post
router.post('/', async (req,res)=> {
   const suscriber = new Suscriber({
       name: req.body.name,
       suscribeToChanel: req.body.suscribeToChanel
   })
   try {
       const newSuscribe = await suscriber.save()
       res.status(201).json(newSuscribe)
   } catch (err) {
       res.status(400).json({message: err.message})
   }
})

// router get
router.get('/', async (req,res)=> {
    try {
        const Displaydata = await Suscriber.find()
        res.json(Displaydata)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// delete one 
router.delete('/:id', getSubscriber, async (req,res)=> {
    try {
        await res.subscriber.remove()
        res.json({message: "suscessfull delete one"})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// update one 
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Suscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router