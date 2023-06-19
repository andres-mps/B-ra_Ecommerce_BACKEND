function isOwner(req, res, next) {
  return req.auth.id === req.params.id ? next() : res.json("usuario no autorizado");
}
module.exports = isOwner;
