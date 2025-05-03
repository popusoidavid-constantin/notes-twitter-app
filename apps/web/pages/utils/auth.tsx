import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";

const KEY = "supersecret";
export function createJSONToken(email, userId) {
  return sign({ email, userId }, KEY, { expiresIn: "1d" });
}

export function verifyJSONToken(token) {
  return verify(token, KEY);
}

export function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}
