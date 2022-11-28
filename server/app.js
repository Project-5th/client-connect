const express = require("express");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authroutes");
const mainRoutes = require("./routes/mainroutes");
const postRoutes = require("./routes/postRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
// const keys = require("../keys");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const CookieSession = require("cookie-session");
const ejs = require("ejs");
const passport = require("passport");
require("./config/passport_setup")(passport);
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static("../public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
//new added by me
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);
app.use(
  CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(cookieParser());
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// middleware

//auth routes
app.use("/auth", authRoutes);
//home route
app.use("/", mainRoutes);

app.use("/post", postRoutes);

app.use("/booking", bookingRoutes);

module.exports = app;
