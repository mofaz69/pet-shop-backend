const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {
  if (!req.cookies?.jwt) {
    return res.status(403).json("not authorized - missing jwt token");
  }

  jwt.verify(req.cookies.jwt, process.env.JWT, (error, decodedToken) => {
    if (error) {
      console.log(error);
      return res.status(403).json({ message: "not authorized" });
    } else {
      req.user = decodedToken;
      next();
    }
  });
}

module.exports = { requireLogin };
