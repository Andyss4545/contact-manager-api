const mongoose = require('mongoose') // import mongoose

const connectDb = async() => {
      try {
        // connect the mongodb connection string from the database with mongoose
           const connect = await mongoose.connect(process.env.CONNECTION_STRING)
           console.log("Database connect:", connect.connection.host, connect.connection.name)
      }catch(err) {
            console.log(err)
            process.exit(1) // if there is error exit 
      }
}


module.exports = connectDb