import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { user, password, mail } = req.body;

    const newUser = new User({ user, password, mail });
    const savedUser = await newUser.save();


    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
        const duplicatedField = Object.keys(err.keyValue)[0];
        return res.status(409).json({ error: `El campo '${duplicatedField}' ya está registrado` });
      }
    console.error(err);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});


router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password'); 
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      res.json(user);  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  });

export default router;