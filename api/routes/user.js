import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// // Check if the user authenticated or NOT

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello User, you are logged in");
// });

// // Verify if the user authorized or NOT
// router.get("checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and you can delete your account");
// });

// // Verify if the user is admin or NOT
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin, you are logged in and you can delete all accounts");
// });

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getAllUsers);

export default router;
