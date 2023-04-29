import User from "../models/User.js";

// @desc Update User
// @route PUT /api/users/:id

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a User
// @route DELETE /api/users/:id

export const deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
// @desc Get a Single Users
// @route GET /api/users

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc Get All Users
// @route GET /api/users

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
