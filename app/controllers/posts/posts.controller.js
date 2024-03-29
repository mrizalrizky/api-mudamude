const db = require("../../models/index");
const jsonMessage = require("../../jsonFormat/jsonMessage");
const service = require("../../services/errorHandler");
const postPresenter = require("../../presenter/posts.presenter");
// const postRatingsRepo =
//   require("../../repositories/posts/postRatings.repositories")(db);
let message;
let myError = new Error();

const createUserPost = async (req, res) => {
  try {
    const { id_user, content, url } = req.body;

    if (!id_user) {
      message = {
        indonesian: "ID User tidak boleh kosong",
        english: "ID User cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!content) {
      message = {
        indonesian: "Content tidak boleh kosong",
        english: "Content cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!url) {
      message = {
        indonesian: "URL tidak boleh kosong",
        english: "URL cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    const data = await postPresenter.createUserPost(id_user, content, url);

    message = {
      indonesian: "Post berhasil dibuat",
      english: "Post created successfully",
    };

    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, data));
  } catch (error) {
    service.handleError(error, res);
  }
};

const deleteUserPost = async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      message = {
        indonesian: "Slug tidak boleh kosong",
        english: "Slug cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    const deletedData = await postPresenter.deleteUserPost(slug);

    if (deletedData.error) {
      message = {
        indonesian: "Gagal hapus data",
        english: "Failed to delete data",
      };
      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message);

      throw myError;
    }

    message = {
      indonesian: "Berhasil Hapus Data",
      english: "Data deleted successfully",
    };

    res.status(200).send(jsonMessage.jsonSuccess("MUDAMUDE-200", message));
  } catch (error) {
    service.handleError(error, res);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const getData = await postPresenter.getAllPosts();

    if (getData.error) {
      message = {
        indonesian: "Gagal mengambil data",
        english: "Failed to get data",
      };

      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message);
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

const getPostDetails = async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      message = {
        indonesian: "Slug tidak boleh kosong",
        english: "Slug cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    const getData = await postPresenter.getPostDetails(slug);

    if (getData.error) {
      message = {
        indonesian: "Gagal mengambil data",
        english: "Failed to get data",
      };

      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message);
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

const getUserPostList = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      message = {
        indonesian: "Username tidak boleh kosong",
        english: "Username cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    const getData = await postPresenter.getUserPostList(username);

    if (getData.error) {
      message = {
        indonesian: "Gagal mengambil data",
        english: "Failed to get data",
      };

      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message);
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

// const getPostComments = async (req, res) => {
//   try {
//     const id_post = req.query.id_post;

//     if (!id_post) {
//       message = {
//         indonesian: "ID Post tidak boleh kosong",
//         english: "ID Post cannot be empty",
//       };
//       (myError.status = 400),
//         (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message));
//       throw myError;
//     }

//     const getData = await postsRepo.getPostCommentsById(id_post);

//     message = {
//       indonesian: "Berhasil GET Data",
//       english: "Successfully Retrieved Data",
//     };
//     res
//       .status(200)
//       .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, getData));
//   } catch (error) {
//     service.handleError(error, res);
//   }
// };

// const getPostRatings = async (req, res) => {
//   try {
//     const id_post = req.query.id_post;

//     if (!id_post) {
//       message = {
//         indonesian: "ID Post tidak boleh kosong",
//         english: "ID Post cannot be empty",
//       };
//       (myError.status = 400),
//         (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message));
//       throw myError;
//     }

//     const positiveRating = await postRatingsRepo.getPositiveRatingCountById(
//       id_post
//     );
//     const negativeRating = await postRatingsRepo.getNegativeRatingCountById(
//       id_post
//     );

//     const mapData = {
//       positive_rating_count: positiveRating.count,
//       negative_rating_count: negativeRating.count,
//     };

//     message = {
//       indonesian: "Berhasil GET Data",
//       english: "Successfully Retrieved Data",
//     };
//     res
//       .status(200)
//       .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, mapData));
//   } catch (error) {
//     service.handleError(error, res);
//   }
// };

module.exports = {
  createUserPost,
  deleteUserPost,
  getAllPosts,
  getPostDetails,
  getUserPostList,
  // getPostComments,
  // getPostRatings,
};
