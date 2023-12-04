import { db_models } from "@/db/models/db.model";

const { Author, AuthorBooks } = db_models;

const getData = async (req, res) => {
  try {
    const all_author = await Author.findAll();
    if (all_author.length > 0) return res.status(200).send(all_author);
    return res.status(404).send([]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRecord = async (req, res) => {
  try {
    if (req) {
      const { fullname } = req.body;
      Author.findAll({
        where: {
          fullname,
        },
      }).then((author) => {
        if (author.length > 0)
          return res
            .status(409)
            .send(JSON.stringify({ err: "Resource (Item may exist)" }));
        Author.create(req.body)
          .then((item) => {
            res.status(200).send(JSON.stringify(item));
          })
          .catch((err) => {});
      }).catch = (err) => res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default async function handler(req, res) {
  const { method } = req;
  // read items
  if (method === "GET") return getData(req, res);
  // create item
  if (method === "POST") return createRecord(req, res);
}
