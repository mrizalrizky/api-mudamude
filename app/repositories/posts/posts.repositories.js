const sequelize = require("sequelize");
const { nanoid } = require("nanoid");

function postsRepository(db) {
  const createUserPost = (id_user, content, url) => {
    const slug = nanoid(8);
    return db.postsDB.create({
      id_user,
      content,
      url,
      slug,
    });
  };

  const deleteUserPost = (slug) => {
    return db.postsDB.destroy({
      where: {
        slug,
      },
    });
  };

  const getAllPosts = () => {
    return db.postsDB.findAll({
      attributes: [
        "id_post",
        "id_user",
        "content",
        "slug",
        sequelize.col("mudamude_user.fullName", "fullName"),
        sequelize.col("mudamude_user.institution", "institution"),
      ],
      include: {
        model: db.mudamudeUser,
        attributes: [],
      },
      raw: true,
      order: [["createdAt", "DESC"]],
    });
  };

  const getPostDetailBySlug = (slug) => {
    return db.postsDB.findOne({
      where: {
        slug,
      },
      attributes: [
        "id_post",
        "content",
        "url",
        sequelize.col("mudamude_user.fullName", "fullName"),
        sequelize.col("mudamude_user.institution", "institution"),
      ],
      include: [
        {
          model: db.mudamudeUser,
          attributes: [],
        },
      ],
      raw: true,
    });
  };

  const getPostListByUsername = (username) => {
    return db.postsDB.findAll({
      where: {
        id_user: {
          [sequelize.Op.in]: [
            sequelize.literal(
              `SELECT id_user FROM mudamude_users WHERE username='${username}'`
            ),
          ],
        },
      },
      include: {
        model: db.mudamudeUser,
      },
    });
  };

  const getPostCommentsById = (id_post) => {
    return db.postsDB.findAll({
      where: {
        id_post,
      },
      attributes: [
        "id_post",
        sequelize.col("post_comments.comment", "comment"),
        sequelize.col("post_comments.mudamude_user.fullName"),
        sequelize.col("post_comments.createdAt", "createdAt"),
      ],
      include: {
        required: true,
        model: db.postComments,
        attributes: [],

        include: {
          model: db.mudamudeUser,
          attributes: [],
        },
      },
      raw: true,
    });
  };

  return {
    createUserPost,
    deleteUserPost,
    getAllPosts,
    getPostDetailBySlug,
    getPostListByUsername,
    getPostCommentsById,
  };
}

module.exports = postsRepository;
