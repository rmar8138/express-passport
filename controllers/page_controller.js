const index = (req, res) => {
  req.session.views = req.session.views ? req.session.views + 1 : 1;
  res.send(`Welcome! You have viewed this page ${req.session.views} time`);
};

const dashboard = (req, res) => {
  res.render("pages/dashboard", { user: req.user });
};

module.exports = {
  index,
  dashboard
};
