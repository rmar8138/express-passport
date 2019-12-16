const express = require("express");
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

router.get("/dashboard", authRedirect, PageController.dashboard);

router.get("/login", AuthenticationController.loginNew);

router.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  AuthenticationController.loginCreate
);

router.get("/logout", AuthenticationController.logout);

module.exports = router;
