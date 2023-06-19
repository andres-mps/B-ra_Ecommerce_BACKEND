const { Admin } = require("../models");
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
  const admin = await Admin.findOne({ where: { email: email } });
  if (!admin) {
    return res.json("Credenciales incorrectas");
  }
  const match = await admin.comparePassword(password);
  if (!match) {
    return res.json("Credenciales incorrectas");
  }

  const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.SESSION_SECRET);

  return res.json({ token, adminData: admin });
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
