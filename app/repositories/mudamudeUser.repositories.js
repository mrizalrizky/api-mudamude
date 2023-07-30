const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

function mudamudeUserRepository(db) {
  const userSignUp = (
    fullName,
    username,
    email,
    password,
    id_role = 3,
    verified_flag = 0
  ) => {
    return db.mudamudeUser.create({
      fullName,
      username,
      email,
      password,
      id_role,
      verified_flag,
    });
  };

  const userLogin = async (username, password) => {
    const user = await db.mudamudeUser.findOne({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  };

  const getUserInfoByUsername = (username) => {
    return db.mudamudeUser.findOne({
      where: {
        username,
      },
      attributes: [
        "id_user",
        "id_role",
        "username",
        "fullName",
        "email",
        "phone",
        "institution",
        "major",
      ],
      include: {
        model: db.masterRoles,
        attributes: ["name"],
      },
      logging: true,
    });
  };

  const getUserUploadedEvents = (username) => {
    return db.mudamudeUser.findAll({
      where: {
        username,
      },
      attributes: [
        "id_user",
        "username",
        sequelize.col("uploaded_events.id_event", "id_event"),
        sequelize.col("uploaded_events.master_event.title", "title"),
        sequelize.col(
          "uploaded_events.master_event.organizer_name",
          "organizer_name"
        ),
        sequelize.col("uploaded_events.master_event.event_date", "event_date"),
        sequelize.col("uploaded_events.master_event.slug", "slug"),
        sequelize.col(
          "uploaded_events.master_event.master_category.id_category",
          "id_category"
        ),
        sequelize.col(
          "uploaded_events.master_event.master_category.name",
          "category_name"
        ),
      ],
      include: {
        model: db.uploadedEvents,
        attributes: [],
        required: true,

        include: {
          model: db.masterEvent,
          attributes: [],
          include: {
            model: db.masterEventCategory,
            attributes: [],
          },
        },
      },
      raw: true,
    });
  };

  const getUserRegisteredEvents = (username) => {
    return db.mudamudeUser.findAll({
      where: {
        username,
      },
      attributes: [
        "id_user",
        "username",
        sequelize.col("registered_events.id_event", "id_event"),
        sequelize.col("registered_events.master_event.title", "title"),
        sequelize.col(
          "registered_events.master_event.organizer_name",
          "organizer_name"
        ),
        sequelize.col(
          "registered_events.master_event.event_date",
          "event_date"
        ),
        sequelize.col("registered_events.master_event.slug", "slug"),
      ],
      include: {
        model: db.registeredEvents,
        attributes: [],
        required: true,

        include: {
          model: db.masterEvent,
          attributes: [],
        },
      },
      raw: true,
    });
  };

  const setUserVerified = (username) => {
    return db.mudamudeUser.update({
      where: {
        username,
      },
    });
  };

  return {
    userSignUp,
    userLogin,
    getUserInfoByUsername,
    getUserUploadedEvents,
    getUserRegisteredEvents,
    setUserVerified,
  };
}

module.exports = mudamudeUserRepository;
