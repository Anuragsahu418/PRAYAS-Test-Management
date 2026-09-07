require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {Admin,Student,Test,Result,Quiz,Question,QuizAttempt,PreviousPaper,} = require("./models");
const { verifyToken, isAdmin, isStudent, isTeacher } = require("./middleware");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY,});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
// Middleware
app.use(cors());
app.use(express.json());


const isAdminOrTeacher = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "teacher") {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "previous-papers",
    resource_type: "raw", // Required for PDF files
    public_id: `${Date.now()}-${path.parse(file.originalname).name}`,
    format: "pdf",
  }),
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF allowed"));
    }
    cb(null, true);
  },
});

app.post(
  "/api/papers",
  verifyToken,
  isAdmin,
  upload.single("pdf"),
  async (req, res) => {
    try {
      const paper = await PreviousPaper.create({
  className: req.body.className,
  subject: req.body.subject,
  year: req.body.year,
  title: req.body.title,
  pdfUrl: req.file.path,
});

      res.json(paper);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

app.get("/api/papers", async (req, res) => {
  try {
    const filter = {};

    if (req.query.className)
      filter.className = req.query.className;

    if (req.query.subject)
      filter.subject = req.query.subject;

    const papers = await PreviousPaper.find(filter).sort({
  year: -1,     // Latest year first
  subject: 1,   // A-Z within the same year
  title: 1,     // A-Z within the same subject
});

    res.json(papers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

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
    const { studentCode, rollNo, name, password } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Update normal student information
    student.studentCode = studentCode;
    student.rollNo = rollNo;
    student.name = name;

    // Update password only if a new password was entered
    if (password && password.trim() !== "") {
      student.password = await bcrypt.hash(password, 10);
    }

    await student.save();

    res.json(student);

  } catch (err) {
    console.error("Update student error:", err);

    res.status(500).json({
      message: err.message,
    });
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
    res.status(500).json({ message: "Server Error" });
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

    console.log("Results in DB:", results);
    console.log("Response Data:", data);

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

// =====================================================
// QUIZ MANAGEMENT
// =====================================================

// Admin: Get all quizzes
app.get("/api/quizzes", verifyToken, isAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({
  quizName: 1,
});

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load quizzes",
      error: err.message,
    });
  }
});


// Admin: Create quiz
app.post("/api/quizzes", verifyToken, isAdmin, async (req, res) => {
  try {
    const {
      quizName,
      className,
      subject,
      chapter,
      totalQuestions,
      timeLimit,
      marksPerQuestion,
    } = req.body;

    if (
      !quizName ||
      !className ||
      !subject ||
      !chapter ||
      !totalQuestions ||
      !timeLimit ||
      !marksPerQuestion
    ) {
      return res.status(400).json({
        message: "All quiz fields are required",
      });
    }

    const quiz = await Quiz.create({
      quizName,
      className,
      subject,
      chapter,
      totalQuestions: Number(totalQuestions),
      timeLimit: Number(timeLimit),
      marksPerQuestion: Number(marksPerQuestion),
      status: "draft",
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create quiz",
      error: err.message,
    });
  }
});


// Admin: Publish quiz
app.put(
  "/api/quizzes/:id/publish",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return res.status(404).json({
          message: "Quiz not found",
        });
      }

      // Get actual questions belonging to this quiz
      const questionCount = await Question.countDocuments({
        quizId: quiz._id,
      });

      // Make sure required number of questions exists
      if (questionCount !== quiz.totalQuestions) {
        return res.status(400).json({
          message: `Quiz requires ${quiz.totalQuestions} questions, but only ${questionCount} have been added.`,
        });
      }

      // Make sure the quiz has valid questions
      const questions = await Question.find({
        quizId: quiz._id,
      });

      for (const question of questions) {
        if (!question.questionText?.trim()) {
          return res.status(400).json({
            message: "One or more questions have empty question text.",
          });
        }

        if (!question.options || question.options.length < 2) {
          return res.status(400).json({
            message: "Every question must have at least 2 options.",
          });
        }

        if (
          !question.correctAnswers ||
          question.correctAnswers.length === 0
        ) {
          return res.status(400).json({
            message: "Every question must have at least one correct answer.",
          });
        }

        if (
          question.type === "MCQ" &&
          question.correctAnswers.length !== 1
        ) {
          return res.status(400).json({
            message: "Every MCQ must have exactly one correct answer.",
          });
        }
      }

      // Publish quiz
      quiz.status = "published";

      // Save publish date only the first time
      if (!quiz.publishedAt) {
        quiz.publishedAt = new Date();
      }

      await quiz.save();

      res.json({
        message: "Quiz published successfully",
        quiz,
      });
    } catch (err) {
      console.error("Publish quiz error:", err);

      res.status(500).json({
        message: "Failed to publish quiz",
        error: err.message,
      });
    }
  }
);

// Admin: Delete quiz
app.delete("/api/quizzes/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // Delete questions belonging to this quiz
    await Question.deleteMany({
      quizId: quiz._id,
    });

    // Delete attempts belonging to this quiz
    await QuizAttempt.deleteMany({
      quizId: quiz._id,
    });

    // Delete the quiz
    await Quiz.findByIdAndDelete(req.params.id);

    res.json({
      message: "Quiz deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete quiz",
      error: err.message,
    });
  }
});

app.put("/api/questions/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(question);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =====================================================
// QUIZ QUESTION MANAGEMENT
// =====================================================

// Admin: Get all questions for a quiz
app.get(
  "/api/quizzes/:quizId/questions",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const questions = await Question.find({
        quizId: req.params.quizId,
      }).sort({ createdAt: 1 });

      res.json(questions);
    } catch (err) {
      res.status(500).json({
        message: "Failed to load questions",
        error: err.message,
      });
    }
  }
);

// Admin: Add question to quiz
app.post(
  "/api/quizzes/:quizId/questions",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const {
        questionText,
        type,
        options,
        correctAnswers,
        marks,
      } = req.body;

      // Basic validation
      if (
        !questionText ||
        !type ||
        !Array.isArray(options) ||
        !Array.isArray(correctAnswers) ||
        marks === undefined
      ) {
        return res.status(400).json({
          message: "All question fields are required",
        });
      }

      // Validate question type
      if (!["MCQ", "MSQ"].includes(type)) {
        return res.status(400).json({
          message: "Question type must be MCQ or MSQ",
        });
      }

      // Make sure quiz exists
      const quiz = await Quiz.findById(req.params.quizId);

      if (!quiz) {
        return res.status(404).json({
          message: "Quiz not found",
        });
      }

      // ✅ Prevent adding more questions than allowed
      const existingQuestions = await Question.countDocuments({
        quizId: quiz._id,
      });

      if (existingQuestions >= quiz.totalQuestions) {
        return res.status(400).json({
          message: `Maximum ${quiz.totalQuestions} questions allowed for this quiz.`,
        });
      }

      // Validate options
      if (options.length < 2) {
        return res.status(400).json({
          message: "At least 2 options are required",
        });
      }

      // MCQ must have exactly one correct answer
      if (type === "MCQ" && correctAnswers.length !== 1) {
        return res.status(400).json({
          message: "MCQ must have exactly one correct answer",
        });
      }

      // MSQ must have at least one correct answer
      if (type === "MSQ" && correctAnswers.length < 1) {
        return res.status(400).json({
          message: "MSQ must have at least one correct answer",
        });
      }

      // Check that answer indexes actually exist
      const invalidAnswer = correctAnswers.some(
        (index) =>
          !Number.isInteger(index) ||
          index < 0 ||
          index >= options.length
      );

      if (invalidAnswer) {
        return res.status(400).json({
          message: "Invalid correct answer index",
        });
      }

      const question = await Question.create({
        quizId: quiz._id,
        questionText: questionText.trim(),
        type,
        options: options.map((opt) => opt.trim()),
        correctAnswers,
        marks: Number(marks),
      });

      res.status(201).json(question);
    } catch (err) {
      res.status(500).json({
        message: "Failed to add question",
        error: err.message,
      });
    }
  }
);

// Student: View published quizzes
app.get("/api/student/quizzes", verifyToken, isStudent, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ status: "published" })
  .sort({
    quizName: 1,
  });

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Student submits quiz
app.post(
  "/api/student/quizzes/:id/submit",
  verifyToken,
  isStudent,
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return res.status(404).json({
          message: "Quiz not found",
        });
      }

      const questions = await Question.find({
        quizId: quiz._id,
      });

      const { attemptId, answers = {} } = req.body;

      const attempt = await QuizAttempt.findById(attemptId);

      if (!attempt) {
        return res.status(404).json({
          message: "Quiz attempt not found",
        });
      }

      // Prevent double submission
      if (attempt.status === "submitted") {
        return res.status(400).json({
          message: "Quiz already submitted",
        });
      }

      // Save answers in the schema format
      attempt.answers = questions.map((question, index) => ({
        questionId: question._id,
        selectedAnswers:
          answers[index] !== undefined
            ? Array.isArray(answers[index])
              ? answers[index]
              : [answers[index]]
            : [],
      }));

      let score = 0;
      const analysis = [];

      questions.forEach((question, index) => {
        const studentAnswer =
          attempt.answers[index]?.selectedAnswers || [];

        let correct = false;

        if (question.type === "MCQ") {
          correct =
            Number(studentAnswer[0]) ===
            Number(question.correctAnswers[0]);
        } else {
          const selected = studentAnswer
            .map(Number)
            .sort((a, b) => a - b);

          const actual = question.correctAnswers
            .map(Number)
            .sort((a, b) => a - b);

          correct =
            JSON.stringify(selected) ===
            JSON.stringify(actual);
        }

        if (correct) {
          score += question.marks;
        }

        analysis.push({
          question: question.questionText,
          studentAnswer,
          correctAnswer: question.correctAnswers,
          correct,
          marks: question.marks,
        });
      });

      // Update attempt
      attempt.obtainedMarks = score;
      attempt.percentage =
        (score /
          (quiz.totalQuestions * quiz.marksPerQuestion)) *
        100;

      attempt.status = "submitted";
      attempt.submittedAt = new Date();

      await attempt.save();

      const verify = await QuizAttempt.findById(attempt._id).lean();

console.log("AFTER SAVE:", {
  id: verify._id,
  status: verify.status,
  obtainedMarks: verify.obtainedMarks,
  percentage: verify.percentage,
  submittedAt: verify.submittedAt,
});

      console.log("✅ Saved Attempt:", {
        id: attempt._id,
        studentId: attempt.studentId,
        quizId: attempt.quizId,
        status: attempt.status,
        obtainedMarks: attempt.obtainedMarks,
      });

      return res.json({
        score: attempt.obtainedMarks,
        totalMarks:
          quiz.totalQuestions * quiz.marksPerQuestion,
        percentage: attempt.percentage,
        analysis,
      });
    } catch (err) {
      console.error("Submit Quiz Error:", err);
      return res.status(500).json({
        message: err.message,
      });
    }
  }
);
// Student starts or resumes quiz
app.get(
  "/api/student/quizzes/:id",
  verifyToken,
  isStudent,
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return res.status(404).json({
          message: "Quiz not found",
        });
      }

      // Hide correct answers
      const questions = await Question.find({
        quizId: quiz._id,
      }).select("-correctAnswers");

      const studentId = req.user.id;

      // Resume unfinished attempt if it exists
      let attempt = await QuizAttempt.findOne({
        studentId,
        quizId: quiz._id,
        status: "in-progress",
      });

      // Create a new attempt if none exists
      if (!attempt) {
        const startedAt = new Date();

        // 20 seconds per question
        const totalTimeInSeconds = quiz.totalQuestions * 20;

        const expiresAt = new Date(
          startedAt.getTime() + totalTimeInSeconds * 1000
        );

        attempt = await QuizAttempt.create({
          studentId,
          quizId: quiz._id,
          startedAt,
          expiresAt,
          status: "in-progress",
          obtainedMarks: 0,
          percentage: 0,
          submittedAt: null,
          answers: questions.map((q) => ({
            questionId: q._id,
            selectedAnswers: [],
          })),
        });
      }

      const remainingTime = Math.max(
        Math.floor((attempt.expiresAt.getTime() - Date.now()) / 1000),
        0
      );

      return res.json({
        quiz,
        questions,
        attempt,
        remainingTime,
      });
    } catch (err) {
      console.error("🔥 Start Quiz Error:", err);

      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

app.get(
  "/api/student/quizzes/:id/history",
  verifyToken,
  isStudent,
  async (req, res) => {
    try {
      const attempts = await QuizAttempt.find({
        studentId: req.user.id,
        quizId: req.params.id,
        status: "submitted",
        submittedAt: { $ne: null }, // Ignore incomplete attempts
      })
        .populate("quizId", "quizName subject chapter totalQuestions marksPerQuestion")
        .sort({ submittedAt: -1 })
        .lean();

      res.json(attempts);
    } catch (err) {
      console.error("History Error:", err);
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

app.get(
  "/api/student/attempt/:attemptId",
  verifyToken,
  isStudent,
  async (req, res) => {
    try {
      const attempt = await QuizAttempt.findOne({
        _id: req.params.attemptId,
        studentId: req.user.id,
      })
        .populate("quizId")
        .populate("answers.questionId");

      if (!attempt) {
        return res.status(404).json({
          message: "Attempt not found",
        });
      }

      res.json(attempt);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);
// Admin: View quiz results (grouped by student)
app.get(
  "/api/quizzes/:id/attempts",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const attempts = await QuizAttempt.aggregate([
        {
          $match: {
            quizId: new mongoose.Types.ObjectId(req.params.id),
            status: "submitted",
            submittedAt: { $ne: null }, // Ignore incomplete attempts
          },
        },
        {
          $sort: {
            submittedAt: -1,
          },
        },
        {
          $group: {
            _id: "$studentId",

            totalAttempts: { $sum: 1 },

            bestScore: { $max: "$obtainedMarks" },

            bestPercentage: { $max: "$percentage" },

            lastAttempt: { $first: "$submittedAt" },
          },
        },
      ]);

      const quiz = await Quiz.findById(req.params.id);

      const results = await Promise.all(
        attempts.map(async (a) => {
          const student = await Student.findById(a._id).select(
            "name rollNo studentCode"
          );

          return {
            studentId: a._id,
            studentName: student?.name || "Unknown",
            rollNo: student?.rollNo || "-",
            studentCode: student?.studentCode || "-",

            totalAttempts: a.totalAttempts,

            obtainedMarks: a.bestScore ?? 0,

            percentage: Number((a.bestPercentage ?? 0).toFixed(1)),

            submittedAt: a.lastAttempt,

            totalMarks:
              (quiz?.totalQuestions ?? 0) *
              (quiz?.marksPerQuestion ?? 0),
          };
        })
      );

      results.sort((a, b) => {
        if (b.obtainedMarks !== a.obtainedMarks) {
          return b.obtainedMarks - a.obtainedMarks;
        }

        return (
          new Date(b.submittedAt || 0) -
          new Date(a.submittedAt || 0)
        );
      });

      console.log("Grouped Results:", results);

      return res.json(results);
    } catch (err) {
      console.error("Quiz Results Error:", err);
      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ================= AI Quiz Generator ================= */

app.post(
  "/api/ai/generate-questions",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const {
        className,
        subject,
        chapter,
        totalQuestions,
        difficulty,
        type,
        marksPerQuestion,
      } = req.body;

      const prompt = `
Generate ${totalQuestions} ${type} questions.

Rules:
- Class: ${className}
- Subject: ${subject}
- Chapter: ${chapter}
- Difficulty: ${difficulty}
- Every question carries ${marksPerQuestion} marks.
- Return ONLY valid JSON.

Format:

[
  {
    "questionText":"...",
    "type":"MCQ",
    "options":["A","B","C","D"],
    "correctAnswers":[1],
    "marks":${marksPerQuestion}
  }
]
`;

      const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
});

      const text = response.text
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/```$/i, "")
  .trim();
        

      res.json(JSON.parse(text));
    } catch (err) {
  console.error("AI Error:", err);

  return res.status(500).json({
    message: "AI generation failed",
    error: err.message,
    details: err.error || null,
  });
}
  }
);

module.exports = app;

app.get(
  "/api/quizzes/:quizId/student/:studentId/history",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const attempts = await QuizAttempt.find({
        quizId: req.params.quizId,
        studentId: req.params.studentId,
        status: "submitted",
      }).sort({ submittedAt: -1 });

      res.json(attempts);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

// Admin: Update question
app.put(
  "/api/questions/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const {
        questionText,
        type,
        options,
        correctAnswers,
        marks,
      } = req.body;

      if (
        !questionText ||
        !type ||
        !Array.isArray(options) ||
        !Array.isArray(correctAnswers) ||
        !marks
      ) {
        return res.status(400).json({
          message: "All question fields are required",
        });
      }

      if (!["MCQ", "MSQ"].includes(type)) {
        return res.status(400).json({
          message: "Question type must be MCQ or MSQ",
        });
      }

      if (options.length < 2) {
        return res.status(400).json({
          message: "At least 2 options are required",
        });
      }

      if (type === "MCQ" && correctAnswers.length !== 1) {
        return res.status(400).json({
          message: "MCQ must have exactly one correct answer",
        });
      }

      if (type === "MSQ" && correctAnswers.length < 1) {
        return res.status(400).json({
          message: "MSQ must have at least one correct answer",
        });
      }

      const invalidAnswer = correctAnswers.some(
        (index) =>
          !Number.isInteger(index) ||
          index < 0 ||
          index >= options.length
      );

      if (invalidAnswer) {
        return res.status(400).json({
          message: "Invalid correct answer index",
        });
      }

      const question = await Question.findByIdAndUpdate(
        req.params.id,
        {
          questionText: questionText.trim(),
          type,
          options,
          correctAnswers,
          marks: Number(marks),
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!question) {
        return res.status(404).json({
          message: "Question not found",
        });
      }

      res.json(question);
    } catch (err) {
      res.status(500).json({
        message: "Failed to update question",
        error: err.message,
      });
    }
  }
);


// Admin: Delete question
app.delete(
  "/api/questions/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const question = await Question.findByIdAndDelete(
        req.params.id
      );

      if (!question) {
        return res.status(404).json({
          message: "Question not found",
        });
      }

      res.json({
        message: "Question deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to delete question",
        error: err.message,
      });
    }
  }
);


if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;