import bcrypt from "bcrypt";
import { registerUser } from "../services/userServices.js";
import { loginUser } from "../services/userServices.js";

export const postRegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const userBody = {
      name: name,
      email: email,
      password: hashedpassword,
    };

    const result = await registerUser(userBody);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
};
export const postLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userBody = {
      email: email,
      password: password,
    };
    const result = await loginUser(userBody);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error logging user:", err);

    // Return the error message as a response with appropriate status code
    if (err.message === "User not found" || err.message === "Invalid password") {
      return res.status(401).json({ message: err.message });
    } else {
      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  }
};
