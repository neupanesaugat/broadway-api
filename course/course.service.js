import Yup from "yup";
import Course from "./course.model.js";

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
