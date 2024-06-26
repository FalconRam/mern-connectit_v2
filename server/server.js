import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import followsAndUnfollows from "./routes/followsAndUnfollows.js";
import profileRoutes from "./routes/profile.js";
import chatRoutes from "./routes/chat.js";

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

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/request", followsAndUnfollows);
app.use("/profile", profileRoutes);
app.use("/chat", chatRoutes);

const port = process.env.PORT;
const dbUri = process.env.CONNECTION_URL;

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
