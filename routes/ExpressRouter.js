const express = require("express")
const ExpressRouter = express.Router()
const morgan = require("morgan")
const { v4: uuidv4 } = require('uuid');


ExpressRouter.use(express.json())
ExpressRouter.use(morgan('dev'))

const bounties = [
    {name: 'Malgus', living: true, type: 'Sith', price: 5000, paymentType: 'Credits', _id: uuidv4()},
    {name: 'Nihilus', living: true, type: 'Sith', price: 7000, paymentType: 'Credits', _id: uuidv4()},
    {name: 'Traya', living: true, type: 'Sith', price: 10000, paymentType: 'Credits', _id: uuidv4()},
]

// - Write a `GET` endpoint that gets all bounties from the array and sends them to the client. - Express Server CRUD Request Function
ExpressRouter.get("/", (req, res) => {
    res.status(200).send(bounties)
})


// - Params GET to pull just one bounty from the array - Express Server CRUD Request Function 
ExpressRouter.get("/:bountyId", (req, res) => {
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
ExpressRouter.get("/search/type", (req, res) => {
    const type = req.query.type
    const bountyType = bounties.filter(target => target.type === type)
    res.status(200).send(bountyType)
})

// - Query GET to pull bounties by the type of payment offered - Express Server CRUD Request Function 
ExpressRouter.get("/search/paymentType", (req, res) => {
    const currency = req.query.paymentType
    const bountyPayout = bounties.filter(target => target.paymentType === currency)
    res.status(200).send(bountyPayout)
})

// - Write a `POST` endpoint that adds a new bounty object to the array of bounties. - Express Server CRUD Request Function
ExpressRouter.post("/", (req, res) => {
const newBounty = req.body
newBounty._id = uuidv4()
bounties.push(newBounty)
    res.status(200).send(newBounty)
})

// - PUT request to change bounty contract details - Express Server CRUD Request Function 
ExpressRouter.put("/:bountyId", (req, res) => {
const bountyId = req.params.bountyId
const contractUpdate = req.body
const bountyIndex = bounties.findIndex(target => target._id === bountyId)
const updatedBounty = Object.assign(bounties[bountyIndex], contractUpdate)
    res.status(200).send(updatedBounty)
})

// - Delete request to remove a bounty hunter from the list - Express Server CRUD Request Function 
ExpressRouter.delete("/:bountyId", (req, res) => {
const bountyId = req.params.bountyId
const bountyIndex = bounties.findIndex(target => target._id === bountyId)
bounties.splice(bountyIndex, 1)
    res.status(200).send(`Contract Complete: ${bountyIndex.price} ${bountyIndex.paymentType} have been added to your account.`)
})



module.exports = ExpressRouter