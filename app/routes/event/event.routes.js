module.exports = (app) => {
  let router = require("express").Router();
  const eventController = require("../../controllers/event/event.controller");

  router.post("/upload", eventController.uploadEvent);
  router.get("/:slug/detail", eventController.getEventDetail);
  router.get("/all", eventController.getAllEvent);
  router.get("/upcoming", eventController.getListUpcomingEvent);
  router.get("/popular", eventController.getListPopularEvent);
  router.get("/", eventController.getListEventFilter);

  app.use("/api/event", router);
};
