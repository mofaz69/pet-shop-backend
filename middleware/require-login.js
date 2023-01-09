const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {
  console.log("requireLogin");
  if (!req.cookies?.jwt) {
    res.status(403).send("not authorized - missing jwt token");
    res.redirect("/login");
  }

  jwt.verify(req.cookies.jwt, "jwtSecret", (error, decodedToken) => {
    if (error) {
      console.log(error);
      return res.status(403).send("not authorized");
    } else {
      req.user = decodedToken;
      next();
    }
  });
}

module.exports = { requireLogin };
