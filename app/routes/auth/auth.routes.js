module.exports = (app) => {
  let router = require("express").Router();
  const authController = require("../../controllers/auth/auth.controller");
  const validator = require("../../validators/auth.validator");

  router.post("/register", validator.register, authController.userSignUp);
  router.post("/login", validator.login, authController.userLogin);
  router.put("/verify", authController.verifyUser);

  app.use("/api/auth", router);
};
