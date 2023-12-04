import { db_models } from "@/db/models/db.model";
const { Feed, Book, User, Comment } = db_models;

// Create a new feed entry
const createFeedEntry = async (req, res) => {
  //   const { userAccountId, action, bookId, commentId, targetUserId } = req.body;

  try {
    console.log(req.body, " ---ddh");
    await Feed.create(req.body);

    res.status(200).json({ message: "Feed entry created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the feed entry" });
  }
};

const getFeedEntries = async (req, res) => {
  try {
    const { followUserId } = req.query;

    console.log(req.query, " ---dg");
    const userIdsArray = followUserId.split(",").map((id) => parseInt(id, 10));

    console.log(userIdsArray); // [1, 3]
    const results = await Feed.findAll({
      where: {
        userAccountId: userIdsArray,
        action: [
          "liked",
          "commented",
          "set_to_reading",
          "recommended",
          "set_to_done_reading",
        ],
      },
      include: [
        {
          model: Book,
          as: "books",
        },
        {
          model: User,
          as: "users",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: Comment,
          as: "comments",
        },
        {
          model: User,
          as: "targetUser",
          attributes: ["id", "fullname", "email"],
        },
      ],
    });

    if (results && results.length > 0) {
      return res.status(200).send(results);
    } else {
      return res.status(404).send({
        msg: "No feed entries found",
      });
    }
  } catch (error) {
    console.error("Error in getFeedEntries:", error);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: error.message, // Add this line to send the error message to the client
    });
  }
};

// Get all feed entries for a specific user
// const getFeedEntries = async (req, res) => {
//   const { userAccountId } = req.query;

//   try {
//     const feedEntries = await Feed.findAll({
//       where: { userAccountId },
//       order: [["createdAt", "DESC"]], // Sort entries by creation time in descending order
//       include: [
//         {
//           model: Book,
//           as: "targetBook",
//           attributes: ["title"], // Only fetch the book title
//         },
//         {
//           model: User,
//           as: "targetUser",
//           attributes: ["username"], // Only fetch the user's username
//         },
//       ],
//     });

//     res.status(200).json({ feedEntries });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching feed entries" });
//   }
// };

// Update a specific feed entry
const updateFeedEntry = async (req, res) => {
  const { feedEntryId } = req.query;
  const { action, bookId, commentId, targetUserId } = req.body;

  try {
    await Feed.update(
      {
        action,
        bookId,
        commentId,
        targetUserId,
      },
      {
        where: { id: feedEntryId },
      }
    );

    res.status(200).json({ message: "Feed entry updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the feed entry" });
  }
};

// Delete a specific feed entry
const deleteFeedEntry = async (req, res) => {
  const { feedEntryId } = req.query;

  try {
    await Feed.destroy({
      where: { id: feedEntryId },
    });

    res.status(200).json({ message: "Feed entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the feed entry" });
  }
};

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "POST":
      await createFeedEntry(req, res);
      break;
    case "GET":
      await getFeedEntries(req, res);
      break;
    case "PUT":
      await updateFeedEntry(req, res);
      break;
    case "DELETE":
      await deleteFeedEntry(req, res);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
