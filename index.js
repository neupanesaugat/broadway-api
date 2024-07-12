import express from "express";
import connectDB from "./connect.db.js";
import courseRoutes from "./course/course.controller.js";

const app = express();

// make app understand json
app.use(express.json());

// register routes
app.use("/course", courseRoutes);

// connect DB
connectDB();

// network port and server
const PORT = 8002;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
