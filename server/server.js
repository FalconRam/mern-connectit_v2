import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import rootRoutes from "./routes/index.js";

const app = express();
dotenv.config();

app.use(
  express.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

// CORS are added in EC2's nginx, hence only this add cors on local
if (process.env.NODE_ENV !== "production") app.use(cors());

// app.use(cors({ origin: "https://connectit-v2.vercel.app" }));

// api Routes
app.use(rootRoutes);

const port = process.env.PORT;
const dbUri = process.env.CONNECTION_URL;

// To Support deployment on Render
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

mongoose.set("strictQuery", true);
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  })
  .catch((err) => console.log(err));
