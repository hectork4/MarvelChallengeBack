import { UsserRepository } from "../model/user-repository.js";

export const get = async (req, res) => {
  const { user } = req.session;

  if (!user) return res.status(403).send("Unauthorized");

  try {
    const data = await UsserRepository.getFavorites({
      username: user.username,
    });

    res.send({ favorites: data, username: user.username });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const add = async (req, res) => {
  const { user } = req.session;

  const { favorite: favoriteId } = req.body;
  if (!user) return res.status(403).send("Unauthorized");

  try {
    const data = await UsserRepository.addFavorite({
      username: user.username,
      favoriteId,
    });

    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const remove = async (req, res) => {
  const { user } = req.session;

  const { favorite: favoriteId } = req.body;
  if (!user) return res.status(403).send("Unauthorized");

  try {
    const data = await UsserRepository.removeFavorite({
      username: user.username,
      favoriteId,
    });

    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
