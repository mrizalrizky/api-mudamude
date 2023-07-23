const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};
