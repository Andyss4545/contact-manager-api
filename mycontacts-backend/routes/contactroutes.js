const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateTokenHandler')
const {
    getContacts, 
    getContact,
    updateContact,
    createContact,
    deleteContact,
} = require("../controllers/contactController")


router.use(validateToken) // import the validateTokenHandler

router.route("/").get(getContacts)
router.route("/").post(createContact)
router.route("/:id").get(getContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)


module.exports = router