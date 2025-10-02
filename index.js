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
app.use(cors({
    origin:"https://prime-notes.netlify.app",
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
