import express from "express";
import Hotel from "../models/Hotel";

const router = express.Router();

// @desc Create New Hotel
// @route POST /api/hotels
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(err);
  }
});

// @desc Update Hotel
// @route PUT /api/hotels/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @desc Delete a Hotel
// @route DELETE /api/hotels/:id
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has benn deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// @desc Get a Single Hotel
// @route GET /api/hotels
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @desc Get All Hotels
// @route GET /api/hotels
router.get("/", async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
});
