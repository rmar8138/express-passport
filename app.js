const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(expressSession);
const passport = require("./config/passport");
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("combined"));

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

app.use(express.static("public"));

app.use(require("./middleware/error_handler_middleware"));

module.exports = app;
