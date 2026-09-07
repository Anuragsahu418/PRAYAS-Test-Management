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


// ================= Quiz =================

const QuizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
      trim: true,
    },

    className: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    chapter: {
      type: String,
      required: true,
      trim: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },

    timeLimit: {
      type: Number,
      required: true,
      min: 1,
      // Time in minutes
    },

    marksPerQuestion: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
  type: String,
  enum: ["draft", "published"],
  default: "draft",
},

publishedAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);


// ================= Quiz Question =================

const QuestionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["MCQ", "MSQ"],
      required: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 2;
        },
        message: "At least 2 options are required",
      },
    },

    correctAnswers: {
      type: [Number],
      required: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);


// ================= Quiz Attempt =================

const QuizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },

        selectedAnswers: {
          type: [Number],
          default: [],
        },
      },
    ],

    startedAt: {
      type: Date,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["in-progress", "submitted", "expired"],
      default: "in-progress",
    },

    obtainedMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const PreviousPaperSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    examType: {
  type: String,
  default: "Previous Paper",
},

    title: {
      type: String,
      required: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PreviousPaper = mongoose.model(
  "PreviousPaper",
  PreviousPaperSchema
);

const Admin = mongoose.model("Admin", AdminSchema);
const Student = mongoose.model("Student", StudentSchema);
const Test = mongoose.model("Test", TestSchema);
const Result = mongoose.model("Result", ResultSchema);

const Quiz = mongoose.model("Quiz", QuizSchema);
const Question = mongoose.model("Question", QuestionSchema);
const QuizAttempt = mongoose.model("QuizAttempt", QuizAttemptSchema);



module.exports = {
  Admin,
  Student,
  Test,
  Result,
  Quiz,
  Question,
  QuizAttempt,
  PreviousPaper,
};

