import express from "express";
import cors from "cors";
import compression from "compression";
import db from "./db";
import path from "path";

const app = express();

//import routes
import postRoutes from "../routes/postRoutes";

// applying middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//serving frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });
}

//declaring routes
app.use("/api/v1/posts", postRoutes);

//setup database
db.connect((err) => {
  if (err) console.log(err);
  console.log(`Database connected successfully`);
});

export default app;
