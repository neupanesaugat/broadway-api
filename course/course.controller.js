import express from "express";
import {
  addCourse,
  deleteCourse,
  updateCourse,
  validateCourse,
  validateMongoId,
} from "./course.service.js";

const router = express.Router();

//? add course
router.post("/add", validateCourse, addCourse);

//? delete course
router.delete("/delete/:id", validateMongoId, deleteCourse);

//? edit course
router.put("/edit/:id", validateMongoId, updateCourse);

export default router;
