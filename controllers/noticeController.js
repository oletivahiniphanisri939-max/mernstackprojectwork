const Notice = require("../models/noticeModel");


// ================= ADD NOTICE =================
exports.addNotice = async (req, res) => {
    try {

        const { type, title, description, date } = req.body;

        // ✅ VALIDATION
        if (!type || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Type, Title and Description are required"
            });
        }

        const newNotice = new Notice({
            type,
            title,
            description,
            date: date ? new Date(date) : new Date()   // ✅ FIX
        });

        await newNotice.save();

        res.status(201).json({
            success: true,
            message: "Notice added successfully",
            notice: newNotice
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ================= GET ALL NOTICES =================
exports.getNotices = async (req, res) => {
    try {

        const notices = await Notice.find()
            .sort({ createdAt: -1 }); // latest first

        res.status(200).json({
            success: true,
            count: notices.length,
            notices
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ================= GET SINGLE NOTICE (OPTIONAL) =================
exports.getSingleNotice = async (req, res) => {
    try {

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        res.status(200).json({
            success: true,
            notice
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ================= UPDATE NOTICE =================
exports.updateNotice = async (req, res) => {
    try {

        const { type, title, description, date } = req.body;

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        // ✅ UPDATE FIELDS SAFELY
        if (type) notice.type = type;
        if (title) notice.title = title;
        if (description) notice.description = description;
        if (date) notice.date = new Date(date);

        await notice.save();

        res.status(200).json({
            success: true,
            message: "Notice updated successfully",
            notice
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ================= DELETE NOTICE =================
exports.deleteNotice = async (req, res) => {
    try {

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        await notice.deleteOne(); // ✅ better

        res.status(200).json({
            success: true,
            message: "Notice deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};