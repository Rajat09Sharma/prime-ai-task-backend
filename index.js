require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { authRouter } = require("./routes/auth");
const { notesRouter } = require("./routes/note");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
    origin: process.env.CORS_URL, // should be like 'https://sunny-kringle-6e2793.netlify.app'
    credentials: true,           
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}));

// Connect to DB
connectDB();

// Routes
app.use("/auth", authRouter);
app.use("/note", notesRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}.`);
});
