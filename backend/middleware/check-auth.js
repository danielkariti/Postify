const jwt = require ("jsonwebtoken");

const salt=process.env.JWT_KEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, salt);
    req.userData = {email: decodedToken.email ,  userId: decodedToken.userId }
    next();
  } catch (error) {
    res.status(401).json({message:'You are not authenticated!'});
  }
};
