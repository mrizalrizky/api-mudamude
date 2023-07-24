const sequelize = require("sequelize");

function masterEventRepository(db) {
  const uploadEvent = async (
    id_category,
    title,
    slug,
    description,
    organizer_name,
    location,
    ticket_price,
    event_date,
    event_time,
    duration,
    benefit,
    eligibility
  ) => {
    return db.masterEvent.create({
      id_category,
      title,
      slug,
      description,
      organizer_name,
      location,
      ticket_price,
      event_date,
      event_time,
      duration,
      benefit,
      eligibility,
    });
  };

  const getAllEvent = () => {
    return db.masterEvent.findAll({
      attributes: [
        [sequelize.col("master_category.name"), "category_name"],
        "id_event",
        "slug",
        "title",
        "description",
        "organizer_name",
        "location",
        "event_date",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: db.masterEventCategory,
        attributes: [],
        required: true,
      },
      raw: true,
    });
  };

  const getEventDetail = (slug) => {
    return db.masterEvent.findOne({
      where: {
        slug,
      },
      attributes: [
        [sequelize.col("master_category.name"), "category_name"],
        "id_event",
        "slug",
        "title",
        "description",
        "organizer_name",
        "location",
        "event_date",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: db.masterEventCategory,
          attributes: [],
          required: true,
        },
      ],
    });
  };

  const getListUpcomingEvent = (startDate, endDate) => {
    return db.masterEvent.findAll({
      where: {
        event_date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
      order: ["event_date"],
    });
  };

  const getListEventFilter = (userInputs) => {
    // console.log(filter);
    // const filterBy = {};

    const filter = {};
    if (userInputs.title) filter.title = userInputs.title;
    if (userInputs.location) filter.location = userInputs.location;
    if (userInputs.eventDate) filter.eventDate = userInputs.eventDate;
    if (userInputs.id_category) filter.id_category = userInputs.id_category;

    Object.entries(userInputs).forEach(([key, value]) => {
      filter[key] = {
        [sequelize.Op.like]: `%${value}%`,
      };
    });

    return db.masterEvent.findAll({
      where: {
        [sequelize.Op.and]: [filter],
      },
    });
  };

  return {
    uploadEvent,
    getAllEvent,
    getEventDetail,
    getListUpcomingEvent,
    getListEventFilter,
  };
}

module.exports = masterEventRepository;
