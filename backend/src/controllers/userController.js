const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate de que la ruta es correcta

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate de que la ruta es correcta

// ✅ SOLO UNA DEFINICIÓN de loginUser
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!process.env.JWT_SECRET) {
      console.error("⚠️ ERROR: JWT_SECRET no está definido en las variables de entorno.");
      return res.status(500).json({ message: "Error interno del servidor: JWT no configurado." });
    }

    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ email: user.email, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Inicio de sesión exitoso", token, nombre: user.nombre, apellido: user.apellido, email: user.email, rol: user.rol });
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

// ✅ Exporta correctamente todas las funciones
module.exports = {
  loginUser,
  getAllUsers,
  getUserById,
  getUser,
  updateUser,
  deleteUserById,
  updateUserById,
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Obtener datos del propio usuario
exports.getUser = async (req, res) => {
  try {
    const user = await User.getByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Actualizar datos del propio usuario
exports.updateUser = async (req, res) => {
  const { email } = req.user;
  const { nombre, apellido, telefono, direccion } = req.body;
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    const updatedUser = await User.updateSelf({
      id: user.id,
      nombre,
      apellido,
      telefono,
      direccion,
    });

    res.json({
      message: 'Usuario actualizado correctamente',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario por ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.deleteById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

// Actualizar un usuario por ID (Admin)
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { email, rol, nombre, apellido, telefono, direccion } = req.body;
  try {
    const user = await User.updateById({
      id,
      email,
      rol,
      nombre,
      apellido,
      telefono,
      direccion,
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

module.exports = { loginUser };
