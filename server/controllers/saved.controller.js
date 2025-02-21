import Saved from "../models/saved.model.js";
import { errorHandler } from "../utils/error.js";

export const acceptedChrist = async (req, res, next) => {
  const { fullname, email, phonenumber, message, tc_acceptance } = req.body;
  if (
    !fullname ||
    !email ||
    !phonenumber ||
    !message ||
    !tc_acceptance ||
    fullname === "" ||
    email === "" ||
    phonenumber === "" ||
    message === "" ||
    tc_acceptance === false
  ) {
    return next(errorHandler(400, "All fields are required!"));
  }

  const newSaved = new Saved({
    fullname,
    email,
    phonenumber,
    message,
    tc_acceptance,
  });

  try {
    await newSaved.save();
    res.json("Message Successfully Sent.");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  // if (!req.user.isAdmin) {
  //   return next(errorHandler(403, "You are not allowed to view messages"));
  // }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const saveds = await Saved.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalSaveds = await Saved.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthSaveds = await Saved.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      saveds,
      totalSaveds,
      lastMonthSaveds,
    });
  } catch (error) {
    next(error);
  }
};
