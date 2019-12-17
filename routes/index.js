const express = require("express");
const passport = require("passport");
const { celebrate, Joi, Segments } = require("celebrate");
const PageController = require("../controllers/page_controller");
const AuthenticationController = require("../controllers/authentication_controller");
const { authRedirect } = require("../middleware/authorization_middleware");
const router = express.Router();

router.get("/", PageController.index);

router.get("/register", AuthenticationController.registerNew);

router.post(
  "/register",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  AuthenticationController.registerCreate
);

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  PageController.dashboard
);

router.get("/login", AuthenticationController.loginNew);

router.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  passport.authenticate("local", {
    failureRedirect: "/login",
    session: false // dont save user to session, we be using jwt
  }),
  AuthenticationController.loginCreate
);

router.get("/logout", AuthenticationController.logout);

module.exports = router;
