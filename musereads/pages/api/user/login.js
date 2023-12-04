import { db_models } from "@/db/models/db.model";
import bcrypt from "bcryptjs";

const { User } = db_models;

const ValidateUser = async ({ password, user, res }) => {
  let hashedPassword = user.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) return res.status(401).send({ errMsg: "Password incorrect!" }); // if password not match
  const { id, email, fullname, role, createdAt } = user;
  let validUser = {
    id,
    email,
    name: fullname,
    role,
    joined: createdAt,
  };
  return res.status(200).send(validUser);
};

async function SignInUser(req, res) {
  const { email, password, role } = req.body;
  const user = await User.findOne({ where: { email, role }, raw: true });
  if (!user)
    return res.status(404).send({ errorMsg: "You are not registered yet!" }); // return err_msg if no user
  if (user) return ValidateUser({ password, user, res });
}

export default function handler(req, res) {
  if (req.method === "POST") return SignInUser(req, res);
}
