function isOwner(req, res, next) {
  return Number(req.auth.id) === Number(req.params.id)
    ? next()
    : res.json("El error es en isOwner");
}
module.exports = isOwner;
