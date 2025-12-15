const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt; // read JWT from cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
