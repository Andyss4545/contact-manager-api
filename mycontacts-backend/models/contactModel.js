const mongoose = require('mongoose');

// contact Schema are fields you want to collect from the client
const contactSchema = mongoose.Schema({
      name: {
          type: String,
          required: [true, "Please add the contact name"],
      },

      email: {
        type: String,
        required: [true, "Please add the contact email"],
        unique: true
      },

      phone:{
        type: String,
        required: [true, "Please add the contact phone"],
      }

}, {
    timestamps: true
});


module.exports = mongoose.model("contacts", contactSchema);