const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();


// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());


// ================= STATIC FILES =================
app.use(express.static(path.join(__dirname, "../public")));


// ================= DATABASE =================
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("DB Error:", err));


// ================= ROUTES =================
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const noticeRoutes = require("./routes/noticeRoutes");


// 🔥 IMPORTANT: SUPPORT BOTH ROUTES

// ✅ OLD STYLE (for your frontend)
app.use("/api", studentRoutes);

// ✅ NEW STYLE (optional future use)
app.use("/api/students", studentRoutes);


// OTHER ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/notices", noticeRoutes);


// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
});


// ================= ERROR HANDLING =================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found ❌"
    });
});


// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});