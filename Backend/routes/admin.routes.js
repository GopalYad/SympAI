import express from "express";

import { protect,authorize } from "../middlewares/authorization.middlewares.js";

import {
  getUsers,
  getUserById,
  deleteUser,
  getAllDoctors,
  approveDoctor,
} from "../controllers/adminControllers.js";
const router = express.Router();

//admin only routes
router.use(protect);
router.use(authorize("admin"));

//user routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

//doctor routes
router.get("/doctors", getAllDoctors);
router.put("/doctors/:id/approve", approveDoctor);


export default router;
