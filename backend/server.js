require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Admin, Student, Test, Result } = require("./models");
const { verifyToken, isAdmin, isStudent, isTeacher } = require("./middleware");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const isAdminOrTeacher = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "teacher") {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
};

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await createAdmin();
  })
  .catch((err) => console.log(err));

// Test Route
app.get("/api", (req, res) => {
  res.send("🚀 Test Management API is Running...");
});

app.get("/api/create-admins", async (req, res) => {
  try {
    await createAdmin();
    res.send("Admins created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Check Admin
  let user = await Admin.findOne({ username });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ message: "Invalid Password" });

    const role = user.username === "Teacher" ? "teacher" : "admin";

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      role,
      token,
    });
  }

  // Check Student
  user = await Student.findOne({ studentCode: username });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: user._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

  return res.json({
  role: "student",
  token,

  student: {
    id: user._id,
    name: user.name,
    rollNo: user.rollNo,
    studentCode: user.studentCode,
  },
});
  }

  res.status(404).json({
    message: "User Not Found",
  });
});

app.post("/api/students", verifyToken, isAdmin, async (req, res) => {
  try {
    const { studentCode, password, rollNo, name } = req.body;

    const student = await Student.create({
      studentCode,
      password: await bcrypt.hash(password, 10),
      rollNo,
      name,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/students", verifyToken, isAdminOrTeacher, async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNo: 1 });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/students/search/:key", verifyToken, isAdminOrTeacher, async (req, res) => {
  try {
    const key = req.params.key;

    const students = await Student.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { studentCode: { $regex: key, $options: "i" } },
        { rollNo: Number(key) || -1 },
      ],
    }).sort({ rollNo: 1 });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { studentCode, rollNo, name } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        studentCode,
        rollNo,
        name,
      },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/students/reset/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Student.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    });

    res.json({
      message: "Password Reset Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/tests", verifyToken, isAdmin, async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/tests", verifyToken, async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: -1 });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/tests/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/tests/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);

    // Delete all results of this test
    await Result.deleteMany({ testId: req.params.id });

    res.json({
      message: "Test Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/results/:testId", verifyToken, isAdminOrTeacher, async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNo: 1 });

    const results = await Result.find({ testId: req.params.testId });

    const data = students.map((student) => {
      const result = results.find(
        (r) => r.studentId.toString() === student._id.toString()
      );

      return {
        studentId: student._id,
        rollNo: student.rollNo,
        name: student.name,
        marks: result ? result.marks : "",
        remarks: result ? result.remarks : "",
      };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post("/api/results/:testId", verifyToken, isAdmin, async (req, res) => {
  try {
    const { testId } = req.params;
    const results = req.body;

    await Result.bulkWrite(
      results.map((item) => ({
        updateOne: {
          filter: {
            studentId: item.studentId,
            testId: testId,
          },
          update: {
            $set: {
              marks: item.marks,
              remarks: item.remarks,
            },
          },
          upsert: true,
        },
      }))
    );

    res.json({ message: "Results Saved Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/dashboard", verifyToken, isAdminOrTeacher, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTests = await Test.countDocuments();

    const results = await Result.find();

    // Ignore Absent while calculating statistics
    const marks = results
      .filter((r) => r.marks !== "Absent")
      .map((r) => Number(r.marks));

    const averageMarks =
      marks.length > 0
        ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2)
        : 0;

    const highestMarks = marks.length ? Math.max(...marks) : 0;
    const lowestMarks = marks.length ? Math.min(...marks) : 0;

    const recentTests = await Test.find()
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalStudents,
      totalTests,
      averageMarks,
      highestMarks,
      lowestMarks,
      recentTests,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

async function createAdmin() {
  const admins = [
    {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    {
      username: "Teacher",
      password: "Teacher@prayas2026",
    },
  ];

  for (const adminData of admins) {
    const exists = await Admin.findOne({
      username: adminData.username,
    });

    if (!exists) {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      await Admin.create({  
        username: adminData.username,
        password: hashedPassword,
      });

      console.log(`✅ Admin created: ${adminData.username}`);
    }
  }
}

app.get("/api/student/dashboard", verifyToken, isStudent, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    const results = await Result.find({
      studentId: req.user.id,
    }).populate("testId");

    const marks = results
      .filter((r) => r.marks !== "Absent")
      .map((r) => Number(r.marks));

    const average =
      marks.length > 0
        ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2)
        : 0;

   res.json({
  student: {
    name: student.name,
    rollNo: student.rollNo,
    studentCode: student.studentCode,
  },

  totalTests: results.length,
  average,
  highest: marks.length ? Math.max(...marks) : 0,
  lowest: marks.length ? Math.min(...marks) : 0,
  results,
});

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/api/students-with-performance", verifyToken, isAdminOrTeacher, async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNo: 1 });

    const data = await Promise.all(
      students.map(async (student) => {
        const results = await Result.find({
          studentId: student._id,
        }).populate("testId");

        const percentages = results
          .filter(
            (r) =>
              !isNaN(Number(r.marks)) &&
              r.testId?.totalMarks
          )
          .map(
            (r) =>
              (Number(r.marks) / Number(r.testId.totalMarks)) * 100
          );

        const averagePercentage = percentages.length
          ? (
              percentages.reduce((a, b) => a + b, 0) /
              percentages.length
            ).toFixed(1)
          : "0.0";

        return {
          _id: student._id,
          rollNo: student.rollNo,
          name: student.name,
          studentCode: student.studentCode,
          averagePercentage,
        };
      })
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/student/results", verifyToken, isStudent, async (req, res) => {
  try {
    const results = await Result.find({
      studentId: req.user.id,
    }).populate("testId");

    res.json(results);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
