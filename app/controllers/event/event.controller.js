const db = require("../../models/index");
const service = require("../../services/errorHandler");
const jsonMessage = require("../../jsonFormat/jsonMessage");
const masterEventRepo =
  require("../../repositories/master/masterEvent.repositories")(db);
const moment = require("moment");
const { createEventSlug } = require("../../utils/createEventSlug");
let message;
let myError = new Error();

const uploadEvent = async (req, res) => {
  const {
    id_category,
    title,
    description,
    organizer_name,
    location,
    benefit,
    eligibility,
  } = req.body;
  const ticketPrice = req.body.ticket_price;
  const eventDate = req.body.event_date;
  const eventTime = req.body.event_time;
  const eventDuration = req.body.duration;

  try {
    if (!title) {
      message = {
        indonesian: "Title tidak boleh kosong",
        english: "Title cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!id_category) {
      message = {
        indonesian: "ID Category tidak boleh kosong",
        english: "ID Category cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!organizer_name) {
      message = {
        indonesian: "ID Organizer tidak boleh kosong",
        english: "ID Organizer cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!location) {
      message = {
        indonesian: "Lokasi tidak boleh kosong",
        english: "Location cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!ticketPrice) {
      message = {
        indonesian: "Harga Tiket tidak boleh kosong",
        english: "Ticket Price cannot be empty",
      };
      (myError.status = 400),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message));
      throw myError;
    }

    if (!eventDate) {
      message = {
        indonesian: "Tanggal Event tidak boleh kosong",
        english: "Event Date cannot be empty",
      };
      myError.status = 400;
      myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message);
      throw myError;
    }

    if (!eventTime) {
      message = {
        indonesian: "Event Time tidak boleh kosong",
        english: "Event Time cannot be empty",
      };
      (myError.status = 400),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message));
      throw myError;
    }

    if (!eventDuration) {
      message = {
        indonesian: "Duration tidak boleh kosong",
        english: "Duration cannot be empty",
      };
      (myError.status = 400),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message));
      throw myError;
    }

    const slug = await createEventSlug(title);

    const postData = await masterEventRepo.uploadEvent(
      id_category,
      title,
      slug,
      description,
      organizer_name,
      location,
      ticketPrice,
      eventDate,
      eventTime,
      eventDuration,
      benefit,
      eligibility
    );
    if (!postData) {
      message = {
        indonesian: "Gagal POST Data",
        english: "Failed to POST Data",
      };
      (myError.status = 500),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message));
      throw myError;
    }

    message = {
      english: "Event created successfully",
      indonesian: "Event berhasil dibuat",
    };

    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, postData));
  } catch (error) {
    service.handleError(error, res);
  }
};

const getAllEvent = async (req, res) => {
  try {
    const getData = await masterEventRepo.getAllEvent();

    if (!getData) {
      message = {
        indonesian: "Gagal GET Data",
        english: "Failed To Retrieve Data",
      };

      (myError.status = 500),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-500", message));
      throw myError;
    }

    message = {
      indonesian: "Berhasil GET Data",
      english: "Successfully Retrieved Data",
    };

    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, getData));
  } catch (error) {
    service.handleError(error, res);
  }
};

const getEventDetail = async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      message = {
        indonesian: "Slug tidak boleh kosong",
        english: "Slug cannot be empty",
      };
      (myError.status = 400),
        (myError.outputJson = jsonMessage.jsonFailed("MUDAMUDE-400", message));
      throw myError;
    }

    const getData = await masterEventRepo.getEventDetail(slug);

    message = {
      indonesian: "Berhasil GET Data",
      english: "Successfully Retrieved Data",
    };

    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, getData));
  } catch (error) {
    service.handleError(error, res);
  }
};

const getListUpcomingEvent = async (req, res) => {
  try {
    // Event yang akan diadakan dalam 7 hari
    const startDate = moment().format("YYYY-MM-DD");
    const endDate = moment().add(7, "days").format("YYYY-MM-DD");

    const getData = await masterEventRepo.getListUpcomingEvent(
      startDate,
      endDate
    );

    message = {
      indonesian: "Berhasil GET Data",
      english: "Successfully Retrieved Data",
    };

    res
      .status(200)
      .send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, getData));
  } catch (error) {
    service.handleError(error, res);
  }
};

const getListPopularEvent = async (req, res) => {};

const getListEventFilter = async (req, res) => {
  try {
    const getData = await masterEventRepo.getListEventFilter(req.query);

    message = {
      indonesian: "Berhasil GET Data",
      english: "Successfully Retrieved Data",
    };
    res.send(jsonMessage.jsonSuccess("MUDAMUDE-200", message, getData));
  } catch (error) {
    service.handleError(error, res);
  }
};

module.exports = {
  uploadEvent,
  getAllEvent,
  getEventDetail,
  getListUpcomingEvent,
  getListPopularEvent,
  getListEventFilter,
};
