import bcryptjs from "bcryptjs";
import crypto from "crypto";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import // sendHandlerActivatedEmail,
// sendHandlerActivationEmail,
// sendPasswordResetEmail,
// sendResetSuccessEmail,
// sendTemporaryHandlerCredentials,
"../mailtrap/emails.js";

// ------------------------------  new user registration ----------------------
export const userRegistration = async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  try {
    // check content from req.body
    if (!fullname || !email || !phone || !password) {
      throw new Error("All fields are required!");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password and generate verification token
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // save new user
    const user = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    // generate cookie with jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// -------------------------------- user login--------------------------
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials!" });
    }

    if (!user.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "User not activated, contact Admin" });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials!" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// --------------------- get all users -------------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --------------------- get all users -------------------------
export const getLastMonthUsers = async (req, res) => {
  try {
    // const users = await User.find();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(201).json({
      success: true,
      message: "Last Month Users fetched successfully",
      lastMonthUsers,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------------- edit user ---------------------------------------------------------------
export const editUser = async (req, res) => {
  const { fullname, user_email, affiliation } = req.body;

  try {
    // check content from req.body
    if (!fullname || !user_email || !affiliation) {
      throw new Error("All fields are required!");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ user_email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // generate temporary password
    const tempPassword =
      "Invoice@app" + Math.floor(100000 + Math.random() * 900000).toString();

    // hash password and generate verification token
    const hashedPassword = bcryptjs.hashSync(tempPassword, 10);

    // generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // save new user
    const user = new User({
      fullname,
      user_email,
      user_password: hashedPassword,
      affiliation,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // generate cookie with jwt
    generateTokenAndSetCookie(res, user._id);
    await sendTemporaryHandlerCredentials(user.user_email, tempPassword);

    const savedUser = await User.findOne({ user_email }).populate(
      "affiliation"
    );
    // await sendHandlerActivationEmail(
    //   savedUser.affiliation.business_email,
    //   verificationToken
    // );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, user_password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// verify handler registration
export const verifyHandlerRegistration = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).populate("affiliation");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isActive = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // await sendHandlerActivatedEmail(
    //   user.affiliation.business_email,
    //   user.affiliation.business_name
    // );

    res.status(200).json({
      success: true,
      message: "Handler Activated Successfully",
      user: { ...user._doc, user_password: undefined },
    });
  } catch (error) {
    console.log("Error in verifyHandlerRegistration", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// user logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully" });
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { user_email } = req.body;

  try {
    const user = await User.findOne({ user_email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User not found!`,
      });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    // await sendPasswordResetEmail(
    //   user.user_email,
    //   `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    // );

    res.status(200).json({
      success: true,
      message: "Passowrd reset link set to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { user_password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired Reset Token!" });
    }

    // update password
    const hashedPassword = bcryptjs.hashSync(user_password, 10);

    user.user_password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.user_email);

    res
      .status(200)
      .json({ sucess: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// check authentication
export const CheckAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-user_password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ sucess: false, message: error.message });
  }
};
