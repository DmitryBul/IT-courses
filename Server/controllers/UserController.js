import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../db/models/UserModel.js";

const JWT_SECRET = "secret123";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { firstName, secondName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      secondName,
      email,
      passwordHash,
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { _id: savedUser._id, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { passwordHash: _, ...userData } = savedUser._doc;

    res.status(201).json({ ...userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd rejestracji" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Nieprawidłowy login albo hasło" });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

    const { passwordHash: _, ...userData } = user._doc;

    res.status(200).json({ ...userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd logowania" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate(
      "savedCourses completedCourses createdCourses"
    );

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    const { passwordHash: _, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd" });
  }
};
