const express = require("express")
const bountyRouter = express.Router()
const morgan = require("morgan")
const { v4: uuidv4 } = require('uuid');
// Capitalize all Mongoose Model variables to indicate that they are Mongoose Models
const BountyPoster =  require('../../models/bountyPoster.js');


bountyRouter.use(express.json())
bountyRouter.use(morgan('dev'))

const bounties = [
    {name: 'Malgus', living: true, type: 'Sith', price: 5000, paymentType: 'Credits', _id: uuidv4()},
    {name: 'Nihilus', living: true, type: 'Sith', price: 7000, paymentType: 'Credits', _id: uuidv4()},
    {name: 'Traya', living: true, type: 'Sith', price: 10000, paymentType: 'Credits', _id: uuidv4()},
]


// // Mongoose GET All CRUD Request
// bountyRouter.get('/', async (req, res, next) => {
    // try {
        // const bounties = await BountyPoster.find()
        // res.status(200).send(bounties)
    // } catch (err) {
        // res.status(500)
        // return next(err)
    // }
// })

// // Mongoose Post CRUD Request - First async attempt
bountyRouter.post('/', async (req, res, next) => {
    try {
        const newBounty = new BountyPoster(req.body)
        const savedBounty = await newBounty.save()
        res.send(savedBounty)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Old Callback Method {Mongoose v6}
bountyRouter.post('/', (req, res, next) => {
    const newBounty = new BountyPoster(req.body)
    newBounty.save((err, savedBounty) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBounty)
    })
})
// // Mongoose Delete CRUD Request - First async attempt
bountyRouter.delete('/bountyId', async (req, res, next) => {
    try {
        const bountyId = req.params.bountyId
        const foundBounty = BountyPoster.findByIdAndDelete(bountyId)
        res.send(foundBounty)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// // Mongoose Delete CRUD Request - Old Callback function
bountyRouter.delete('/bountyId', (req, res, next) => {
    BountyPoster.findOneAndDelete({_id: req.params.bountyId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database.`)
    })
    
})

// // Mongoose Put CRUD Request - First Async attempt
bountyRouter.put('/bountyId', (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
    
})

// // Mongoose Put CRUD Request - Old Callback function
bountyRouter.put('/bountyId', (req, res, next) => {
    BountyPoster.findOneAndUpdate(
        {_id: req.params.bountyId}, 
        req.body, 
        {new: true},
        (err, updatedBounty) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        }
        )
    
})

 


// - Write a `GET` endpoint that gets all bounties from the array and sends them to the client. - Express Server CRUD Request Function
bountyRouter.get("/", (req, res) => {
        res.status(200).send(bounties)
    })



// - Params GET to pull just one bounty from the array - Express Server CRUD Request Function 
bountyRouter.get("/:bountyId", (req, res) => {
        const bountyId = req.params.bountyId 
        const foundBounty = bounties.find(target => target._id === bountyId)
        if(!foundBounty){
            const error = new Error("This item was not found")
            res.status(500)
            return next(error)
        }
        res.status(200).send(foundBounty)
    })
//    - Query GET to pull different bounty types - Express Server CRUD Request Function 
bountyRouter.get("/search/type", (req, res) => {
        const type = req.query.type
        const bountyType = bounties.filter(target => target.type === type)
        res.status(200).send(bountyType)
    })
// - Query GET to pull bounties by the type of payment offered - Express Server CRUD Request Function 
bountyRouter.get("/search/paymentType", (req, res) => {
        const currency = req.query.paymentType
        const bountyPayout = bounties.filter(target => target.paymentType === currency)
        res.status(200).send(bountyPayout)
    })
// - Write a `POST` endpoint that adds a new bounty object to the array of bounties. - Express Server CRUD Request Function
bountyRouter.post("/", (req, res) => {
    const newBounty = req.body
    newBounty._id = uuidv4()
    bounties.push(newBounty)
        res.status(200).send(newBounty)
    })
// - PUT request to change bounty contract details - Express Server CRUD Request Function 
bountyRouter.put("/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const contractUpdate = req.body
    const bountyIndex = bounties.findIndex(target => target._id === bountyId)
    const updatedBounty = Object.assign(bounties[bountyIndex], contractUpdate)
        res.status(200).send(updatedBounty)
    })
// - Delete request to remove a bounty hunter from the list - Express Server CRUD Request Function 
bountyRouter.delete("/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const bountyIndex = bounties.findIndex(target => target._id === bountyId)
    bounties.splice(bountyIndex, 1)
        res.status(200).send(`Contract Complete: ${bountyIndex.price} ${bountyIndex.paymentType} have been added to your account.`)
    })



module.exports = bountyRouter