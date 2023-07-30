module.exports = (app) => {
  let router = require("express").Router();
  let postController = require("../../controllers/posts/posts.controller");

  router.post("/", postController.createUserPost);
  router.delete("/:slug", postController.deleteUserPost);
  router.get("/all", postController.getAllPosts);
  router.get("/:slug/detail", postController.getPostDetails);
  router.get("/:username", postController.getUserPostList);
  // router.get("/comments", postController.getPostComments);
  // router.get("/ratings", postController.getPostRatings);

  app.use("/api/posts", router);
};
