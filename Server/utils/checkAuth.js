import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Nie ma dostępu" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    req.userId = decoded._id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Nieprawidłowy token" });
  }
};
