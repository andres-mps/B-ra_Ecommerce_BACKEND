function isOwner(req, res, next) {
  return Number(req.auth.id) === Number(req.params.id)
    ? next()
    : res.json("el error es en isOwner");
}
module.exports = isOwner;
