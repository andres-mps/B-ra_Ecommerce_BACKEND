function isAdmin(req, res, next) {
  return req.auth.role === "admin" ? next() : res.json("usuario no autorizado");
}
module.exports = isAdmin;
