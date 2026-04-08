const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getMessages
} = require("../controllers/contactController");


// ================= SEND MESSAGE =================
// POST: http://localhost:5000/api/contact
router.post("/", sendMessage);


// ================= GET ALL MESSAGES =================
// GET: http://localhost:5000/api/contact
router.get("/", getMessages);


module.exports = router;