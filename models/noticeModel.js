const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
        enum: ["announcement", "event"]   // ✅ only valid types
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    // ✅ store as Date (NOT string)
    date: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true   // ✅ automatically adds createdAt & updatedAt
});

module.exports = mongoose.model("Notice", noticeSchema);