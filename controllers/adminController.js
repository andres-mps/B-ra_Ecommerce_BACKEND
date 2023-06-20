const { Admin } = require("../models");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const admin = await Admin.findAll();
  return res.json(admin);
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    try {
      const { firstname, lastname, email, password } = fields;
      const admin = await new Admin({
        firstname,
        lastname,
        email,
        password,
      });
      await admin.save();
      return res.json("Se ha creado un nuevo admin");
    } catch (err) {
      console.log({ "Error al registrar un admin": err });
      res.json(err);
    }
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const { firstname, lastname, email, password } = req.body;
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.json("Admin no encontrado");
    }

    if (firstname && firstname !== admin.firstname) {
      admin.firstname = firstname;
    }
    if (lastname && lastname !== admin.lastname) {
      admin.lastname = lastname;
    }
    if (email && email !== admin.email) {
      admin.email = email;
    }

    const match = await admin.comparePassword(password);
    if (password && !match) {
      admin.password = password;
    }

    await admin.save();
    return res.json(admin);
  } catch (err) {
    console.log({ "Error al actualizar el admin": err });
    res.json(err);
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const admin = await Admin.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json("Se ha eliminado un admin");
  } catch (err) {
    console.log({ "Error al eliminar un admin": err });
    res.json(err);
  }
}

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
