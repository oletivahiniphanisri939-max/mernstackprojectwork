const express = require("express");
const router = express.Router();

// 🔥 Controllers
const {
    addNotice,
    getNotices,
    updateNotice,
    deleteNotice
} = require("../controllers/noticeController");


// ================= ROUTES =================

// 👉 ADD NOTICE (Admin)
router.post("/", addNotice);

// 👉 GET ALL NOTICES (Student)
router.get("/", getNotices);

// 👉 UPDATE NOTICE
router.put("/:id", updateNotice);

// 👉 DELETE NOTICE
router.delete("/:id", deleteNotice);


module.exports = router;