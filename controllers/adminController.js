const { Admin } = require("../models");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const admin = await Admin.findAll();
  return res.json(admin);
}

async function indexAdmin(req, res) {
  const id = req.params.id;
  const admin = await Admin.findByPk(id);
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
      return res.json("Admin created successfully");
    } catch (err) {
      console.log({ "Failed to register admin": err });
      res.json({ err: "err", message: "Try again with another email" });
    }
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { firstname, lastname, email, password } = fields;
      //console.log(files);
      const admin = await Admin.findByPk(req.params.id);
      if (!admin) {
        return res.json({ err: "err", message: "Admin not found" });
      }
      if (admin.email === "admin@gmail.com") {
        return res.json({
          err: "err",
          message: "This admin cannot be modified",
        });
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
      // const match = await admin.comparePassword(password);
      // if (password && !match) {
      //   admin.password = password;
      // }
      const match = password ? await admin.comparePassword(password) : true;
      password && !match && (admin.password = password);

      await admin.save();
      return res.json(admin);
    });
  } catch (err) {
    console.log({ "Error updating admin": err });
    res.json({ err: "err", message: "Failed to upload, try again" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.json({ err: "err", message: "Admin not found" });
    }
    if (admin.email === "admin@gmail.com") {
      return res.json({
        err: "err",
        message: "This admin cannot be deleted",
      });
    }
    await Admin.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json("Admin deleted successfully");
  } catch (err) {
    console.log({ "Error al eliminar un admin": err });
    res.json({
      err: "err",
      message: "Cannot delete Admin. Please try again",
    });
  }
}

// Token controller
async function token(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email: email } });
  if (!admin) {
    return res.json({ err: "err", message: "Please check your credentials and try again." });
  }
  const match = await admin.comparePassword(password);
  if (!match) {
    return res.json({ err: "err", message: "Please check your credentials and try again." });
  }

  const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.SESSION_SECRET);

  return res.json({ token, adminData: admin });
}

module.exports = {
  index,
  indexAdmin,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  token,
};
