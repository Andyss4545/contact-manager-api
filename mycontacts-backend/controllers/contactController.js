const asyncHandler = require("express-async-handler") // asynchandler to handle all error exceptions
const Contact = require('../models/contactModel') // import the contactmodel
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
       // get all contact by using the find() function
        const contacts = await Contact.find({user_id: req.user.id}) // await and find the contacts
        res.status(200).json(contacts)
        //res.status(200).json({message: "Get all contacts"})
 }) 


//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    // get the Contact by it's Id
       const contact = await Contact.findById(req.params.id)  // await and find each contact by it's id
        if(!contact) {
              res.status(404); // 404 means Error not found
              throw new Error('Contact not found')
        }

        res.status(200).json({contact})
       // res.status(200).json({message: `Get contact for ${req.params.id}`})
}) 


//@desc create new contact
//@route POST /api/contacts/:id
//@access private

const createContact = asyncHandler(async (req, res) => {
        console.log("The request body is : ", req.body)
         // error handling
         const {name, email, phone} = req.body
    
         if(!name || !email || !phone) {
            // if there is no name or email or phone throw new error
               res.status(400);
               throw new Error("All fields are mandatory")
         }

         // create contact with field liek name, email and phone
         const contact = await Contact.create({
              name : name,
              email: email,
              phone: phone,
              user_id: req.user.id
         }) // if all the fields are available then add contact
        res.status(201).json(contact)
        // 201 means resouce created
}) 


//@desc update contact
//@route PUT /api/contacts
//@access private

const updateContact = asyncHandler(async (req, res) => {
    // find the contact by it's id
    const contact = await Contact.findById(req.params.id)
    if(!contact){
          res.status(401);
          throw new Error('Contact not found')
    }

    // if contact is not equal to to the re.user.id,
    // then it means different user is trying to update the contact of another
    if(contact.user_id.toString() !== req.user.id){
          res.status(403) // Not authorized
          throw new Error(`User don't have permission to update other user contacts`)
    }

    // find and  update the contact by Id
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id, // the param id
        req.body,  // the new body I want to update
        { new: true } // query  option as new
    )
    res.status(200).json(updateContact)
    // res.status(200).json({message: `update contact for ${req.params.id}`})
}) 


//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async(req, res) => {
    
    // delete contact by id
     const contact = await Contact.findByIdAndDelete(req.params.id)
     if(!contact) {
         res.status(404)
         throw new Error('Contact could not be found')
     }

     if(contact.user_id.toString() !== req.user.id){
        res.status(403) // Not authorized
        throw new Error(`User don't have permission to update other user contacts`)
     }
      // remove the contact
     res.status(201).json(contact)
    // res.status(201).json({message: `delete contact for ${req.params.id}`})
}) 

module.exports = {
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact
}
