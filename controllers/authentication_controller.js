const UserModel = require("../database/models/user_model");

const registerNew = (req, res) => {
  res.render("authentication/register");
};

const registerCreate = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.create({ email, password });
  req.session.user = user;
  res.redirect("/dashboard");
};

const loginNew = (req, res) => {
  res.render("authentication/login");
};

const loginCreate = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.render("authentication/login", {
      error: "Invalid email & password "
    });
  }

  const valid = await user.verifyPassword(password);

  if (!valid) {
    return res.render("authentication/login", {
      error: "Invalid email & password "
    });
  }

  req.session.user = user;
  res.redirect("/dashboard");
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  registerNew,
  registerCreate,
  loginNew,
  loginCreate,
  logout
};
