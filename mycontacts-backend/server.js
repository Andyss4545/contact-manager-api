const express = require('express');
const connectDb = require('./DatabaseConfig/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
connectDb()
const app = express(); // assign the express function to a variable

const PORT = process.env.PORT || 5000;

app.use(express.json()); // inbuilt middleware to accept data from the client to the server
// whenever we want to use middleware we make use of app.use
// app.use is a middleware
app.use(errorHandler) // import the errorHandler
app.use('/api/contacts', require("./routes/contactroutes")) // require and import the contactroutes

app.listen(PORT, () => {
    console.log(`server running on PORT', ${PORT}`)
});