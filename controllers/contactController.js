const Contact = require("../models/contactMessage");

// ================= SAVE MESSAGE =================
exports.sendMessage = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        const newMsg = new Contact({
            name,
            email,
            message
        });

        await newMsg.save();

        res.json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ================= GET ALL MESSAGES =================
exports.getMessages = async (req, res) => {
    try {

        const messages = await Contact.find().sort({ createdAt: -1 });

        res.json(messages);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};