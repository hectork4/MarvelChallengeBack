import DBLocal from "db-local";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config.js";
const { Schema } = new DBLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  favorites: { type: Array, of: String, required: false },
});

export class UsserRepository {
  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (user) {
      throw new Error("Username already exists");
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const id = crypto.randomUUID();

    User.create({
      _id: id,
      username,
      password: hashPassword,
      favorites: [],
    }).save();
    return { id, username };
  }
  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const { password: _, ...publicUser } = user;

    return publicUser;
  }

  static async getFavorites({ username }) {
    Validation.username(username);

    const { favorites } = User.findOne({ username });

    return favorites;
  }

  static async addFavorite({ username, favoriteId }) {
    Validation.username(username);

    const user = User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const favorites = !user.favorites.includes(favoriteId)
      ? [...user.favorites, favoriteId]
      : user.favorites;

    user.update({ favorites }).save();

    const { password: _, ...publicUser } = user;

    return { ...publicUser, favorites };
  }

  static async removeFavorite({ username, favoriteId }) {
    Validation.username(username);

    const user = User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const favorites = [...user.favorites.filter((id) => id !== favoriteId)];

    user.update({ favorites }).save();

    const { password: _, ...publicUser } = user;

    return { ...publicUser, favorites };
  }
}

class Validation {
  static username(username) {
    if (typeof username !== "string") {
      throw new Error("Invalid input");
    }

    if (username.length < 4) {
      throw new Error("Username is too short");
    }
  }

  static password(password) {
    if (typeof password !== "string") {
      throw new Error("Invalid input");
    }

    if (password.length < 6) {
      throw new Error("Password is too short");
    }
  }
}
