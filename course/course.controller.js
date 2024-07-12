import express from "express";
import { addCourse, validateCourse } from "./course.service.js";

const router = express.Router();

// add course
router.post("/add", validateCourse, addCourse);

export default router;
