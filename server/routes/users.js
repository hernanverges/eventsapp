import express from 'express';
import User from '../models/User.js';
import crypto from 'crypto';
import VerificationToken from '../models/VerificationToken.js';
import sendVerificationMail from '../utils/sendVerificationMail.js';
import loginUser  from "../utils/userLogin.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { user, password, mail } = req.body;

    const newUser = new User({ user, password, mail });
    const savedUser = await newUser.save();

    const tokenString = crypto.randomBytes(32).toString('hex');
    const verificationToken = new VerificationToken({
        userId: savedUser._id,
        token: tokenString,
      });

      await verificationToken.save();

      sendVerificationMail(newUser.mail, tokenString);



    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
        const duplicatedField = Object.keys(err.keyValue)[0];
        return res.status(409).json({ error: `El '${duplicatedField}' ya está registrado` });
      }
    console.error(err);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});


/* METODO POST PARA LOGIN */ 

router.post("/login", loginUser);


/*METODO GET SIN CONTRASEÑA*/ 

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