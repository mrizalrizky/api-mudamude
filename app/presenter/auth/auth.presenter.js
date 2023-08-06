const jwt = require("jsonwebtoken");
const db = require("../../models/index");
const mudamudeUserRepo =
  require("../../repositories/mudamudeUser.repositories")(db);
const { encryptPassword } = require("../../utils/encrypt");

const userSignUp = async (fullName, username, email, password) => {
  try {
    const userExist = await mudamudeUserRepo.getUserInfoByUsername(username);

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

    return mudamudeUserRepo.userSignUp(
      fullName,
      username,
      email,
      await encryptPassword(password)
    );
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
      const token = jwt.sign(
        {
          id: user?.id_user,
          username: user?.username,
          institution: user?.institution,
          verified_flag: user?.verified_flag,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const mapUserData = {
        id_user: user?.id_user,
        id_role: user?.id_role,
        username: user?.username,
        full_name: user?.fullName,
        email: user?.email,
        phone: user?.institution,
        major: user?.major,
        verified_flag: user?.verified_flag,
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

const verifyUserData = async (userId, fullName, birthdate) => {
  try {
    const bodyToUpdate = {
      fullname: fullName,
      verified_flag: true,
    };

    const whereStat = {
      id_user: userId,
    };
    const putData = await mudamudeUserRepo.updateUserData(
      bodyToUpdate,
      whereStat
    );

    return putData;
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
  verifyUserData,
};
