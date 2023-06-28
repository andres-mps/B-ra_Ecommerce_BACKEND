function isOwner(req, res, next) {
  return req.auth.id === req.params.id ? next() : res.json("el error es en isOwner");
}
module.exports = isOwner;
