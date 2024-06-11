const express = require("express")
const mongooseRouter = express.Router()
const morgan = require("morgan")
// Capitalize all Mongoose Model variables to indicate that they are Mongoose Models
const Poster =  require('../../models/poster.js');


mongooseRouter.use(express.json())
mongooseRouter.use(morgan('dev'))


// // Mongoose GET All CRUD Request
mongooseRouter.get('/', async (req, res, next) => {
    try {
        const bounties = await Poster.find()
        res.status(200).send(bounties)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// GET Request for single bounty
mongooseRouter.get('/search/:bountyId', async (req, res, next) => {
    try {
        const bounty = await Poster.findOne(req.body.bountyId)
        const foundBounty = await bounty
        res.status(200).send(foundBounty)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// GET Request for single bounty type
mongooseRouter.get('/search/type', async (req, res, next) => {
    try {
        const bountyType = await Poster.find(req.body.type)
        const foundType = await bountyType
        res.status(200).send(foundType)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// GET Request for single 'paymentType' type
mongooseRouter.get('/search/paymentType', async (req, res, next) => {
    try {
        const paymentMethod = await Poster.find(req.body.paymentType)
        const foundPaymentMethod = await paymentMethod
        res.status(200).send(foundPaymentMethod)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// // Mongoose Post CRUD Request - First async attempt
mongooseRouter.post('/', async (req, res, next) => {
    try {
        const newBounty = new Poster(req.body)
        newBounty.living = true
        const savedBounty = await newBounty.save()
        res.send(savedBounty)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Old Callback Method {Mongoose v6}
// mongooseRouter.post('/', (req, res, next) => {
//     const newBounty = new Poster(req.body)
//     newBounty.save((err, savedBounty) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(201).send(savedBounty)
//     })
// })
// // Mongoose Delete CRUD Request - First async attempt
mongooseRouter.delete('/:bountyId', async (req, res, next) => {
    try {
        const bountyId = req.params.bountyId
        const foundBounty = await Poster.findByIdAndDelete(bountyId)
        res.send(foundBounty)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// // Mongoose Delete CRUD Request - Old Callback function
mongooseRouter.delete('/:bountyId', (req, res, next) => {
    Poster.findOneAndDelete({_id: req.params.bountyId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database.`)
    })
    
})

// // Mongoose Put CRUD Request - First Async attempt
mongooseRouter.put('/:bountyId', async (req, res, next) => {
    try {
        const updatedBounty = await Poster.findOneAndUpdate(
            {_id: req.params.bountyId},
            req.body,
            {new: true}
            )
        res.status(201).send(updatedBounty)
    } catch (error) {
        res.status(500)
        return next(err)
    }
    
})

// // Mongoose Put CRUD Request - Old Callback function
// mongooseRouter.put('/:bountyId', (req, res, next) => {
//     Poster.findOneAndUpdate(
//         {_id: req.params.bountyId}, 
//         req.body, 
//         {new: true},
//         (err, updatedBounty) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(201).send(updatedBounty)
//         }
//         )
    
// })

module.exports = mongooseRouter