import { db_models } from "@/db/models/db.model";

const { UserReading } = db_models;

const UpdateRecord = async (req, res, readId) => {
  try {
    const { CurrentPage } = req.body.pageReached;
    UserReading.findAll({ where: { id: parseInt(readId) } }).then((read) => {
      if (read.length > 0) {
        read[0]
          .update({
            pageReached: CurrentPage,
          })
          .then((updatedUserReading) => {
            return res.status(200).send(JSON.stringify(updatedUserReading));
          });
      }
    });
  } catch (error) {
    return res.status(500).send("Ooops something went wrong");
  }
};

export default async function handler(req, res) {
  const { method } = req;
  const { readId } = req.query;
  // read items
  if (method === "DELETE") return await getData(req, res);
  // create item
  if (method === "PUT") return await UpdateRecord(req, res, readId);
}
