const Admin = require("../models/admin");
const Student = require("../models/student");
const bcrypt = require("bcryptjs");


// ================= ADMIN REGISTER =================
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password required"
            });
        }

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= ADMIN LOGIN =================
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password required"
            });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin not found"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin Login Successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET ALL STUDENTS =================
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= DELETE STUDENT =================
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        await Student.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 🔥 ================= FIXED NAME =================
// THIS IS THE MAIN FIX
exports.updateStudentDetails = async (req, res) => {
    try {
        const { name, email, department, year, gender, phone } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        student.name = name || student.name;
        student.email = email || student.email;
        student.department = department || student.department;
        student.year = year || student.year;
        student.gender = gender || student.gender;
        student.phone = phone || student.phone;

        await student.save();

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= ATTENDANCE =================
exports.updateStudentAttendance = async (req, res) => {
    try {
        const { attendance } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        student.attendance = attendance;

        await student.save();

        res.status(200).json({
            success: true,
            message: "Attendance updated successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= DAILY ATTENDANCE =================
exports.markAttendance = async (req, res) => {
    try {
        const { subject, totalClasses, presentCount } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const sub = student.attendance.find(s => s.subject === subject);

        if (!sub) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }

        const today = new Date().toISOString().split("T")[0];

        if (sub.lastAttendanceDate === today) {
            return res.status(400).json({
                success: false,
                message: "Already marked today"
            });
        }

        sub.total += Number(totalClasses);
        sub.present += Number(presentCount);
        sub.lastAttendanceDate = today;

        await student.save();

        res.status(200).json({
            success: true,
            message: "Attendance updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};