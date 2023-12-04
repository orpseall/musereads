import { getSession } from "next-auth/react";
import { hash } from "@/db/encrypt";
import { db_models } from "@/db/models/db.model";
const { User } = db_models;

// async function AddAdmin(data, res) {
//   const { email, role, password } = data;
//   models[role].findAll({ where: { email } }).then((user) => {
//     if (user.length > 0) {
//       return res
//         .status(409)
//         .send(JSON.stringify({ err: "Username is unavailable!" }));
//     } else {
//       // Password Hash
//       let hashed = hash(password);
//       // newUser.password = hashed;
//       let encrypted_data = { ...data, password: hashed };
//       models[role]
//         .create(encrypted_data)
//         .then((user) => {
//           res.status(200).send(JSON.stringify(user));
//         })
//         .catch((err) => {
//           console.log(err, "error Here create new user");
//         });
//     }
//   }).catch = (err) => console.log(err);
// }

async function AddUser(data, res) {
  const { email, password, role } = data;
  User.findAll({ where: { email } }).then((user) => {
    if (user.length > 0) {
      console.log("user already exist!", user);
      return res
        .status(409)
        .send(JSON.stringify({ err: "Username is unavailable!" }));
    } else {
      // Password Hash
      let hashed = hash(password);
      // newUser.password = hashed;
      let encrypted_data = { ...data, password: hashed };
      User.create(encrypted_data)
        .then((user) => {
          res.status(200).send(JSON.stringify(user));
        })
        .catch((err) => {
          console.log(err, "error Here create new user");
        });
    }
  }).catch = (err) => console.log(err);
}

async function CreateNewUser(req, res) {
  const session = await getSession({ req });
  if (session) return res.status(401).json({ unauthorized: true });
  const { data } = req.body;
  if (data) return AddUser(data, res);
}

export default function handler(req, res) {
  if (req.method === "POST") return CreateNewUser(req, res);
}
