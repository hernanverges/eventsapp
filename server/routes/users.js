import express from 'express';
import User from '../models/User.js';
import crypto from 'crypto';
import AuthenticationToken from '../models/AuthenticationToken.js';
import sendVerificationMail from '../utils/sendVerificationMail.js';
import loginUser  from "../utils/userLogin.js";
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


/* METODO POST DE REGISTRO DE USUARIO*/ 
router.post('/', async (req, res) => {
  try {
    const { user, password, mail } = req.body;

    const newUser = new User({ user, password, mail });
    const savedUser = await newUser.save();

    savedUser.password = undefined;

    const tokenString = crypto.randomBytes(32).toString('hex');
    const authenticationToken = new AuthenticationToken({
        userId: savedUser._id,
        token: tokenString,
      });

      await authenticationToken.save();

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


/* METODO POST PARA LOGIN DE USUARIO */ 

router.post("/login", loginUser);


/*METODO GET PARA OBTENER USUARIO SIN CONTRASEÑA*/ 

router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); 
  
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