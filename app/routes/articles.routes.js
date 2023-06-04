module.exports = (app) => {
  let router = require("express").Router();
  let articleController = require("../controllers/articles.controller");

  router.get("/all", articleController.getAllArticles);
  // router.get('/:slug/detail')

  app.use("/api/articles", router);
};
