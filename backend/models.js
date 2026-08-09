const mongoose = require("mongoose");

// ================= Admin =================
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ================= Student =================
const StudentSchema = new mongoose.Schema({
  studentCode: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// ================= Test =================
const TestSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
});

// ================= Result =================
const ResultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  marks: {
    type: mongoose.Schema.Types.Mixed, // Number or "Absent"
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
const Student = mongoose.model("Student", StudentSchema);
const Test = mongoose.model("Test", TestSchema);
const Result = mongoose.model("Result", ResultSchema);

module.exports = {
  Admin,
  Student,
  Test,
  Result,
};