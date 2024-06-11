const express = require("express")
const morgan = require("morgan")
const mongoose = require('mongoose')
const app = express();
const path = require("path")

app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "client", "dist")))

// Get request for morgan to console log and ensure the fron and back ends are connecting with one another
app.get("/", (req, res) => {
    res.send(`Welcome to the server`)
})

// Connect to Database
// Default mongodb localhost port - 27017
// mongoose.connect(`mongodb://localhost:27017`, console.log(`Connected to the DB`))
const connectedDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://storytellingsag3:taNbU6jYr5IkycE1@cluster0.nygw1e7.mongodb.net/Bounty_Hunter`)
        console.log(`Connected to Database`)
    } catch (err) {
        console.log(err)
    }
}

connectedDB()

// Routes
    // Purely Express-based backend functionality
// app.use("/api/bounties", require("./routes/bountyRouter/ExpressRouter.js"))
    // Mongoose-based async backend functionality
app.use("/api/bounties", require("./routes/bountyRouter/mongooseRouter.js"))

// Error Handling

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.listen(9000, () => {
    console.log("The server is running on Port 9000!!")
})