const { User } = require("../models");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Token controller
async function token(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.json("Credenciales incorrectas");
  }
  const match = await user.comparePassword(password);
  if (!match) {
    return res.json("Credenciales incorrectas");
  }

  const token = jwt.sign({ id: user.id, role: "user" }, process.env.SESSION_SECRET);

  return res.json({ token, userData: user });
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  token,
};
