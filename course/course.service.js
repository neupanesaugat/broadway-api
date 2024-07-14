import Yup from "yup";
import Course from "./course.model.js";
import mongoose from "mongoose";

export const validateCourse = async (req, res, next) => {
  const courseValidationSchema = Yup.object({
    name: Yup.string("Course name should be a string")
      .required()
      .max(25, "Name field should not be greater than 25 letters")
      .trim(),
    duration: Yup.string("Duration should be a string")
      .required()
      .max(15)
      .trim(),
    tutorName: Yup.string().required().max(25).trim(),
    price: Yup.number("Price should be a number").required(),
  });
  try {
    const validatedData = await courseValidationSchema.validate(req.body);
    req.body = validatedData;
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
};

export const addCourse = async (req, res) => {
  const newCourse = req.body;

  await Course.create(newCourse);
  return res
    .status(200)
    .send({ message: "Course has been added successfully..." });
};

export const validateMongoId = (req, res, next) => {
  //* check valid id

  // extract id from req.params
  const id = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(id);

  // if not valid throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid ID!" });
  }

  next();
};

export const deleteCourse = async (req, res) => {
  //* delete course of that id

  // extract course id from req.params
  const courseId = req.params.id;

  // find course
  const requiredCourse = await Course.findById(courseId);

  // if not throw error
  if (!requiredCourse) {
    return res.status(404).send({ message: "Course not found!" });
  }

  // delete course
  await Course.findByIdAndDelete(courseId);

  //res
  return res
    .status(200)
    .send({ message: "Course has been deleted successfully" });
};

export const updateCourse = async (req, res) => {
  // extract course id from req.params
  const courseId = req.params.id;
  //  find course
  const course = await Course.findById(courseId);

  // if not course, throw error
  if (!course) {
    return res.status(404).send({ message: "Course not found!" });
  }

  // extract new values from req.body
  const newCourseValues = req.body;

  // update customer
  await Course.findByIdAndUpdate(courseId, { ...newCourseValues });

  //send res
  return res.status(200).send({ message: "Course has been updated..." });
};
