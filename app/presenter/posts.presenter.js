const db = require("../models/index");
const postsRepo = require("../repositories/posts/posts.repositories")(db);
let mappedData = {};

const createUserPost = async (id_user, content, url) => {
  try {
    const data = await postsRepo.createUserPost(id_user, content, url);

    if (data) {
      mappedData = {
        id_post: data?.id_post,
        content: data?.content,
        slug: data?.slug,
      };

      return mappedData;
    }

    // return postData
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

const deleteUserPost = async (slug) => {
  try {
    let data = await postsRepo.deleteUserPost(slug);
    data = true;

    if (data) {
      return data;
    } else throw new Error();
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

const getAllPosts = async () => {
  try {
    const datas = await postsRepo.getAllPosts();

    let posts = [];
    if (datas) {
      posts = datas.map((data) => ({
        id_post: data.id_post,
        content: data.content,
        slug: data.slug,
        fullName: data.fullName,
        institution: data.institution,
      }));

      return posts;
    }
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

const getPostDetails = async (slug) => {
  try {
    const data = await postsRepo.getPostDetailBySlug(slug);

    if (data) {
      mappedData = {
        id_post: data?.id_post,
        content: data?.content,
        slug: data?.slug,
        fullName: data?.fullName,
        institution: data?.institution,
      };
      return mappedData;
    } else {
      throw new Error();
    }
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

const getUserPostList = async (username) => {
  try {
    const data = await postsRepo.getPostListByUsername(username);

    if (data) {
      mappedData = {
        id_post: data?.id_post,
        content: data?.content,
        slug: data?.slug,
        fullName: data?.fullName,
        institution: data?.institution,
      };

      return mappedData;
    } else {
      throw new Error();
    }
  } catch (error) {
    return {
      error: true,
      errorData: error,
    };
  }
};

module.exports = {
  createUserPost,
  deleteUserPost,
  getAllPosts,
  getPostDetails,
  getUserPostList,
  // getPostComments,
  // getPostRatings,
};
