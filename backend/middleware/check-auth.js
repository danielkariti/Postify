const jwt = require ("jsonwebtoken");

const salt="{riUV(a<cl8aa0qP!@D+";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, salt);
    next();
  } catch (error) {
    res.status(401).json({message:'Login failed!'});
  }
};
