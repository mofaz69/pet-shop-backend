function requireAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "not authorized" });
  req.user = decodedToken;
}

module.exports = { requireAdmin };
