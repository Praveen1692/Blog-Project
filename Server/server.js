import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./configs/db.js";

const app = express();

await connectToDB();
const PORT = process.env.PORT || 5050;
//middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
