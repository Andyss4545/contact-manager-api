//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = (req, res) => {
    res.status(200).json({message: "Get all contacts"})
}


//@desc Get contact
//@route GET /api/contacts/:id
//@access public

const getContact = (req, res) => {
    res.status(200).json({message: `Get contact for ${req.params.id}`})
}


//@desc create new contact
//@route POST /api/contacts/:id
//@access public

const createContact = (req, res) => {
    res.status(201).json({message: "Create contact"})
    // 201 means resouce created
}


//@desc update contact
//@route PUT /api/contacts
//@access public

const updateContact = (req, res) => {
    res.status(200).json({message: `update contact for ${req.params.id}`})
}


//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
    res.status(201).json({message: `delete contact for ${req.params.id}`})
}

module.exports = {
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact
}
