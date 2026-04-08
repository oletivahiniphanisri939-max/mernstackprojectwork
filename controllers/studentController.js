const Student = require("../models/student");
const bcrypt = require("bcryptjs");


// ================= REGISTER =================
exports.registerStudent = async (req, res) => {
    try {

        const { name, email, password, department, year, phone, gender } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, Password required"
            });
        }

        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            department,
            year,
            phone,
            gender,
            attendance: [],
            subjects: 0,
            notices: 0,
            exams: 0
        });

        await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student Registered Successfully",
            student: newStudent
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= LOGIN =================
exports.loginStudent = async (req, res) => {
    try {

        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            student: {
                _id: student._id,
                name: student.name,
                email: student.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= PROFILE BY EMAIL =================
exports.getStudentProfile = async (req, res) => {
    try {

        const student = await Student.findOne({ email: req.params.email }).select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= DASHBOARD PROFILE =================
exports.getStudentById = async (req, res) => {
    try {

        const student = await Student.findById(req.params.id).select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            student: {
                ...student._doc,
                attendance: student.attendance || [],
                subjects: student.subjects || 0,
                notices: student.notices || 0,
                exams: student.exams || 0
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET ATTENDANCE =================
exports.getStudentAttendanceByEmail = async (req, res) => {
    try {

        const student = await Student.findOne({ email: req.params.email });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            attendance: student.attendance || []
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= UPDATE ATTENDANCE =================
exports.updateAttendance = async (req, res) => {
    try {

        const { attendance } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        student.attendance = attendance || [];

        await student.save();

        res.json({
            success: true,
            message: "Attendance updated",
            student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};