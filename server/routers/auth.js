const express = require("express");
const { authSchema } = require("../helper/validation_schema");
const User = require("../models/User");
const createHttpError = require("http-errors");
const { signAccessToken, verifyAccessToken } = require("../helper/jwt_helper");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createHttpError.Conflict(`${result.email} is already exist!`);

    const user = new User(result);
    await user.save();

    // res.send({ accessToken });
    res.send({ message: "User registered success" });
  } catch (err) {
    if (err.isJoi === true) err.status = 401;
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw createHttpError.Unauthorized("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createHttpError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user.id);
    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi === true) {
      return next(createHttpError.BadRequest("Invalid username/password"));
    }
    next(error);
  }
});

router.get("/user/:id", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw createHttpError.Unauthorized("User not registered");

    res.json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error) {
    res.send("error" + error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      res.send(user);
    }
  } catch (error) {
    res.send("error" + error);
  }
});

module.exports = router;
