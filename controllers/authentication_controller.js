const jwt = require("jsonwebtoken");
const UserModel = require("../database/models/user_model");

const registerNew = (req, res) => {
  res.render("authentication/register");
};

const registerCreate = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.create({ email, password });

  req.login(user, error => {
    if (error) {
      return next(error);
    }

    res.redirect("/dashboard");
  });
};

const loginNew = (req, res) => {
  res.render("authentication/login");
};

const loginCreate = (req, res) => {
  const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
  res.json(token);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  registerNew,
  registerCreate,
  loginNew,
  loginCreate,
  logout
};
