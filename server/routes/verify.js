import express from 'express';
import VerificationToken from '../models/VerificationToken.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/:token', async (req, res) => {
  try {
    const token = req.params.token;

    const storedToken = await VerificationToken.findOne({ token });

    if (!storedToken) {
      return res.status(400).send('Token inválido o expirado.');
    }

    const user = await User.findById(storedToken.userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    user.verified = true;
    await user.save();

    await VerificationToken.deleteOne({ _id: storedToken._id });

    res.send('¡Cuenta verificada con éxito!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al verificar la cuenta.');
  }
});

export default router;
