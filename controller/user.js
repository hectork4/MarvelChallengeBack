import jwt from "jsonwebtoken";
import { UsserRepository } from "../model/user-repository.js";
import { SECRET_JWT_KEY } from "../config.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UsserRepository.login({ username, password });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        SameSite: "None",
        Path: "/",
      })
      .send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await UsserRepository.create({ username, password });
    const token = jwt.sign(
      { id: data.id, username: data.username },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        SameSite: "None",
        Path: "/",
      })
      .send({ username, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("access_token").json({ message: "Logged out" });
};
