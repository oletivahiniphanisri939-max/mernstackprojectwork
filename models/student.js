const mongoose = require("mongoose");

// ================= STUDENT SCHEMA =================
const studentSchema = new mongoose.Schema({

  // BASIC INFO
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String
  },

  age: {
    type: Number
  },

  phone: {
    type: Number
  },

  department: {
    type: String
  },

  year: {
    type: Number
  },

  // 🔥 UPDATED ATTENDANCE STRUCTURE
  attendance: [
  {
    subject: String,

    total: {
      type: Number,
      default: 0
    },

    present: {
      type: Number,
      default: 0
    },

    // 🔥 ADD THIS LINE
    lastAttendanceDate: {
      type: String,
      default: ""
    }
  }
],

  // EXTRA COUNTS
  subjects: {
    type: Number,
    default: 0
  },

  notices: {
    type: Number,
    default: 0
  },

  exams: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

// EXPORT
module.exports = mongoose.model("Student", studentSchema);