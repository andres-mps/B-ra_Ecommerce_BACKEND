function atLeastOwner(req, res, next) {
  if (req.auth.role === "admin") {
    return next();
  }

  if (req.auth.id === Number(req.params.userId)) {
    return next();
  }

  return res.json("usuario no autorizado");
}
module.exports = atLeastOwner;
