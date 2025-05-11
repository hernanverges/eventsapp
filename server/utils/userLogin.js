import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });

    if (!user || !user.verified) {
      return res.status(400).json({ message: "Usuario no verificado o no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, mail: user.mail },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, user: { id: user._id, mail: user.mail } });

    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default loginUser;