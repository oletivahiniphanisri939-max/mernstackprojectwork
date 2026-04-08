const express = require("express");
const router = express.Router();

const {
    registerStudent,
    loginStudent,
    getStudentProfile,
    getStudentById,
    getStudentAttendanceByEmail,
    updateAttendance
} = require("../controllers/studentController");


// ================= AUTH =================

// ✅ REGISTER
router.post("/register", registerStudent);

// ✅ LOGIN (IMPORTANT)
router.post("/login", loginStudent);


// ================= PROFILE =================

// 👉 Get profile by email
router.get("/profile/email/:email", getStudentProfile);

// 👉 Get profile by ID (Dashboard)
router.get("/profile/:id", getStudentById);


// ================= ATTENDANCE =================

// 👉 Get attendance
router.get("/attendance/:email", getStudentAttendanceByEmail);

// 👉 Update attendance
router.put("/attendance/:id", updateAttendance);


// ✅ TEST ROUTE (optional)
router.get("/test", (req, res) => {
    res.json({ message: "Student Routes Working ✅" });
});

module.exports = router;