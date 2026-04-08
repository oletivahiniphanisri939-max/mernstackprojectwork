const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
    getAllStudents,
    deleteStudent,
    updateStudentAttendance,
    markAttendance,
    updateStudentDetails   // 🔥 ADD THIS
} = require("../controllers/adminController");


// ================= ADMIN REGISTER =================
router.post("/register", registerAdmin);


// ================= ADMIN LOGIN =================
router.post("/login", loginAdmin);


// ================= GET ALL STUDENTS =================
router.get("/students", getAllStudents);


// ================= DELETE STUDENT =================
router.delete("/students/:id", deleteStudent);


// 🔥 ================= EDIT STUDENT DETAILS =================
router.put("/students/:id", updateStudentDetails);   // ✅ THIS FIX


// ================= UPDATE STUDENT ATTENDANCE =================
router.put("/students/attendance/:id", updateStudentAttendance);


// ================= DAILY ATTENDANCE =================
router.put("/mark-attendance/:id", markAttendance);


module.exports = router;