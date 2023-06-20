const { User, Order } = require("../models");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, password, address, phone } = req.body;
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      address,
      phone,
    });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

//Update the specified resource in storage.
async function update(req, res) {
  const { firstname, lastname, email, password, address, phone } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.json("Usuario no encontrado");
    }

    if (firstname && firstname !== user.firstname) {
      user.firstname = firstname;
    }
    if (lastname && lastname !== user.lastname) {
      user.lastname = lastname;
    }
    if (email && email !== user.email) {
      user.email = email;
    }

    const match = await user.comparePassword(password);
    if (password && !match) {
      user.password = password;
    }

    if (address && address !== user.address) {
      user.address = address;
    }
    if (phone && phone !== user.phone) {
      user.phone = phone;
    }

    await user.save();
    return res.json(user);
  } catch (err) {
    return res.json("Error al actualizar el usuario");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const user = await User.findOne({
    where: { id: req.params.id },
    include: {
      model: Order,
      as: "orders",
    },
  });

  if (user.firstname === "Unknown") {
    return res.json("No puedes eliminar el usuario unknown");
  }

  const userOrders = user.orders;

  const unknownUser = await User.findOne({ where: { firstname: "Unknown" } });
  if (!unknownUser) {
    await User.create({
      firstname: "Unknown",
      lastname: "Unknown",
      email: "Unknown@Unknown",
      password: "1234",
      address: "Unknown",
      phone: "Unknown",
    });
  }

  const unknown = await User.findOne({ where: { firstname: "Unknown" } });

  try {
    await Promise.all(
      userOrders.map((order) => {
        return order.update({ userId: unknown.id });
      }),
    );

    await User.destroy({ where: { id: req.params.id } });

    return res.json("Usuario actualizado  y eliminado correctamente.");
  } catch (err) {
    return res.json(err);
  }
}

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
