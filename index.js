require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const connectDB = require("./config/db");
const { authRouter } = require("./routes/auth");
const { notesRouter } = require("./routes/note");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieparser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use("/auth", authRouter);
app.use("/note", notesRouter);


app.listen(PORT, () => {
    console.log(`Server stared on PORT:${PORT}.`);
})
