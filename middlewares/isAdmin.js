function isAdmin(req, res, next) {
  return req.auth.role === "admin" ? next() : res.json("Unauthorized user.");
}
module.exports = isAdmin;
