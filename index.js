import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import UserPath from "./routes/user.js";
import FavoritePath from "./routes/favorite.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const token = req.cookies.access_token;
  //const token = req.headers["x-access-token"];
  req.session = { user: null };
  if (!!token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY);
      req.session.user = data;
    } catch (error) {
      console.log("error", { error });
      req.session.user = null;
    }
  } else {
    req.session.user = null;
  }

  next();
});

app.use("/user", UserPath);

app.use("/favorites", FavoritePath);

app.get("/", (req, res) => {
  const { user } = req.session;
  res.render("index", user);
});

app.get("/protected", (req, res) => {
  const { user } = req.session;

  if (!user) return res.status(403).send("Unauthorized");
  res.render("protected", user);
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
