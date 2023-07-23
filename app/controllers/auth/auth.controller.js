const db = require("../../models/index");
const authPresenter = require("../../presenter/auth/auth.presenter");
const service = require("../../services/errorHandler");
const jsonMessage = require("../../jsonFormat/jsonMessage");
const { BAD_REQUEST } = require("../../constants/httpStatusCodes");
const { use } = require("passport");
let message;
let myError = new Error();

const userSignUp = async (req, res) => {
  const { full_name, username, email, password, repeat_password } = req.body;

  console.log(repeat_password);
  try {
    if (!full_name) {
      message = {
        indonesian: "Full name tidak boleh kosong",
        english: "Full name cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!username) {
      message = {
        indonesian: "Username tidak boleh kosong",
        english: "Username cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!email) {
      message = {
        indonesian: "Email tidak boleh kosong",
        english: "Email cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!password) {
      message = {
        indonesian: "Password tidak boleh kosong",
        english: "Password cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!repeat_password) {
      message = {
        indonesian: "Repeat Password tidak boleh kosong",
        english: "Repeat Password cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    const userData = await authPresenter.userSignUp(
      full_name,
      username,
      email,
      password
    );

    if (userData.error) {
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed(
        "MUDAMUDE-400",
        userData.errorData
      );
      throw myError;
    }

    message = {
      english: "User registered successfully",
      indonesian: "User berhasil terdaftar",
    };
    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-00", message, userData));
  } catch (error) {
    service.handleError(error, res);
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      message = {
        indonesian: "Username tidak boleh kosong",
        english: "Username cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!password) {
      message = {
        indonesian: "Password tidak boleh kosong",
        english: "Password cannot be empty",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    const userData = await authPresenter.userLogin(username, password);

    if (!userData) {
      message = {
        indonesian: "Login gagal",
        english: "Login failed",
      };
      myError.status = BAD_REQUEST;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    console.log(userData);
    // const mapData = {
    //   email:
    // };

    message = {
      indonesian: "Login berhasil",
      english: "Login successful",
    };
    res.status(200).send(jsonMessage.jsonSuccess("MUDAMUDE-00", message));
  } catch (error) {
    service.handleError(error, res);
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
