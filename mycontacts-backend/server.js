const express = require('express');

const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// app.use is a middleware
app.use('/api/contacts', require("./routes/contactroutes"))

app.listen(PORT, () => {
    console.log(`server running on PORT', ${PORT}`)
});