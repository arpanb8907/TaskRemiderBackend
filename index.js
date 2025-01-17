import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const corsoption = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsoption));

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Helps parse MongoDB connection string
    useUnifiedTopology: true, // Ensures connection stability
  })
  .then(() => console.log("connected to mongodb atlas successfully"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err.message);
    process.exit(1); // Exit if connection fails
  });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
