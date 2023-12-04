import bcrypt from "bcryptjs";

export const hash = (value) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(value, salt);
  return hash;
};
