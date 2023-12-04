import { db_models } from "@/db/models/db.model";

const { UserReading } = db_models;

const getData = async (req, res) => {
  try {
    const all_author = await UserReading.findAll();
    if (all_author.length > 0) return res.status(200).send(all_author);
    return res.status(404).send([]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRecord = async (req, res) => {
  try {
    if (req) {
      const { bookId, userAccountId, Option, pageReached } = req.body;
      let done_reading, wish_to_read;
      if (Option === 1) {
        done_reading = 0;
        wish_to_read = 1;
      } else if (Option === 2) {
        done_reading = 1;
        wish_to_read = 0;
      } else {
        done_reading = 0;
        wish_to_read = 0;
      }
      UserReading.findAll({
        where: {
          bookId,
          userAccountId,
        },
      }).then((user_reading) => {
        if (user_reading.length > 0) {
          // Update the existing userReading
          user_reading[0]
            .update({
              done_reading,
              wish_to_read,
              pageReached,
            })
            .then((updatedUserReading) => {
              return res.status(200).send(JSON.stringify(updatedUserReading));
            });
        } else {
          console.log(
            bookId,
            userAccountId,
            done_reading,
            wish_to_read,
            pageReached,
            " ---whyyyy"
          );
          UserReading.create({
            bookId,
            userAccountId,
            done_reading,
            wish_to_read,
            pageReached,
          })
            .then((item) => {
              res.status(200).send(JSON.stringify(item));
            })
            .catch((err) => {});
        }
      }).catch = (err) => res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default async function handler(req, res) {
  const { method } = req;
  // read items
  if (method === "GET") return await getData(req, res);
  // create item
  if (method === "POST") return await createRecord(req, res);
}
