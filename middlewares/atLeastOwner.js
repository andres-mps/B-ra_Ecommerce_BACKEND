function atLeastOwner(req, res, next) {
  if (req.auth.role === "admin") {
    return next();
  }

  if (Number(req.auth.id) === Number(req.params.userId)) {
    return next();
  }

  return res.json("Unauthorized user.");
}
module.exports = atLeastOwner;
