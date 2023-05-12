module.exports = (app) => {
  let router = require("express").Router();
  //   let articleController = require("../../controllers/articles.controller")(db);

  //   router.get('/all');
  // router.get('/:slug/detail')

  app.use("/api/articles", router);
};
