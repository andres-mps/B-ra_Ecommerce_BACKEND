function isOwner(req, res, next) {
  return req.auth.id === Number(req.params.id) ? next() : res.json("usuario no autorizado");
}
module.exports = isOwner;
