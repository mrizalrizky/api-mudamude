const db = require("../models/index");
const jsonMessage = require("../jsonFormat/jsonMessage");
const service = require("../services/errorHandler");
const articleRepo = require("../repositories/articles.repositories")(db);

const getAllArticles = async (req, res) => {
  try {
    const getData = await articleRepo.getAllArticles();

    if (!getData) {
      message = {
        indonesian: "Gagal GET Data",
        english: "Failed To Retrieve Data",
      };

      (myError.status = 500),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message));
      throw myError;
    }

    message = {
      indonesian: "Berhasil GET Data",
      english: "Successfully Retrieved Data",
    };

    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, getData));
  } catch (error) {
    service.handleError(error, res);
  }
};

module.exports = {
  getAllArticles,
};
