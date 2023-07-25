const jwt = require("jsonwebtoken");
const db = require("../../models/index");
const mudamudeUserRepo =
  require("../../repositories/mudamudeUser.repositories")(db);
const { encryptPassword } = require("../../utils/encrypt");

const userSignUp = async (fullName, username, email, password) => {
  try {
    const userExist = await mudamudeUserRepo.getUserInfo({ username });

    if (userExist) {
      message = {
        indonesian: "Username yang anda pilih sudah terdaftar",
        english: "Username already exist",
      };
      return {
        error: true,
        errorData: message,
      };
    }

    const postData = await mudamudeUserRepo.userSignUp(
      fullName,
      username,
      email,
      await encryptPassword(password)
    );

    return postData;
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

const userLogin = async (username, password) => {
  try {
    const user = await mudamudeUserRepo.userLogin(username, password);

    if (user) {
      const token = jwt.sign({ id: user.username }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });

      const mapUserData = {
        id_user: user?.id_user,
        id_role: user?.id_role,
        username: user?.username,
        full_name: user?.fullName,
        email: user?.email,
        phone: user?.institution,
        major: user?.major,
        access_token: token,
      };

      return mapUserData;
    }
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
