import { getserver } from "@/db/config";
import axios from "axios";

const getAuthor = async (res) => {
  try {
    const data = await axios.get(`${getserver}/api/author`);
    if (data && data.status === 200) return data;
    return [];
  } catch (error) {
    console.log(error);
  }
};

const getBook = async (res) => {
  try {
    const data = await axios.get(`${getserver}/api/book`);
    if (data && data.status === 200) return data;
    return [];
  } catch (error) {
    console.log(error);
  }
};

const getGenre = async (res) => {
  try {
    const data = await axios.get(`${getserver}/api/genre`);
    if (data && data.status === 200) return data;
    if (data && data.status === 409) return [];
  } catch (error) {
    console.log(error);
  }
};

const getData = async (req, res) => {
  try {
    const genreData = await getGenre(res);
    const authorData = await getAuthor(res);
    const bookData = await getBook(res);
    const dataToSend = {
      genreData: genreData.data || [],
      authorData: authorData.data || [],
      bookData: bookData.data || [],
    };
    return res.status(200).send(dataToSend);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// const getData = async (req, res) => {
//   const genreData = await getGenre(res);
//   const authorData = await getAuthor(res);
//   console.log(authorData, " --author", genreData, " ---Just test");
//   return res.status(200).send({ genreData, authorData });
// };

export default async function handler(req, res) {
  const { method } = req;
  // read items
  if (method === "GET") return getData(req, res);
}
