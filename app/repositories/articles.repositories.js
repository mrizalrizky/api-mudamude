function articlesRepository(db) {
  const getAllArticles = () => {
    return db.articlesDB.findAll({});
  };

  return {
    getAllArticles,
  };
}

module.exports = articlesRepository;
