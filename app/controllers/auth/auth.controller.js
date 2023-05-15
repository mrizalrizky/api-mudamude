const db = require("../../models/index");
const service = require("../../services/errorHandler");
const jsonMessage = require("../../jsonFormat/jsonMessage");
const mudamudeUserRepo =
  require("../../repositories/mudamudeUser.repositories")(db);
let message;
let myError = new Error();

const userSignUp = async (req, res) => {
  const { fullName, username, email, id_role } = req.body;
  const password = req.body.password;

  try {
    if (!fullName) {
      message = {
        indonesian: "Full name tidak boleh kosong",
        english: "Full name cannot be empty",
      };
      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed(500, message);
      throw myError;
    }

    if (!username) {
      message = {
        indonesian: "Username tidak boleh kosong",
        english: "Username cannot be empty",
      };
      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed(500, message);
      throw myError;
    }

    if (!email) {
      message = {
        indonesian: "Email tidak boleh kosong",
        english: "Email cannot be empty",
      };
      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed(500, message);
      throw myError;
    }

    if (!password) {
      message = {
        indonesian: "Password tidak boleh kosong",
        english: "Password cannot be empty",
      };
      myError.status = 500;
      myError.outputJson = jsonMessage.jsonFailed(500, message);
      throw myError;
    }

    const postData = await mudamudeUserRepo.userSignUp(
      fullName,
      username,
      email,
      password
    );
    message = {
      english: "User registered successfully",
      indonesian: "User berhasil terdaftar",
    };

    res.status(200).send(jsonMessage.jsonSuccess(200, message, postData));
  } catch (error) {
    service.handleError(error, res);
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // if(!username) {
    //     message = {
    //         "indonesian": "Username tidak boleh kosong",
    //         "english": "Username cannot be empty"
    //     }
    //     service.throwError(500, message)
    // }

    // if(!password) {
    //     message = {
    //         "indonesian": "Password tidak boleh kosong",
    //         "english": "Password cannot be empty"
    //     }
    //     service.throwError(500, message)
    // }

    const data = await mudamudeUserRepo.userLogin(username, password);
    // console.log(data);
  } catch (error) {
    service.handleError(res, 404, message);
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
