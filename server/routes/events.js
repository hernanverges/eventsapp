import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import express from 'express';
import Event from '../models/Event.js';

// Estas líneas son necesarias para usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuramos multer (puede estar también en un archivo separado si querés)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre temporal
  }
});
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    // 1. Crear el evento sin la imagen
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      image: null, // temporalmente null
    });

    // 2. Guardar para obtener el _id de Mongo
    const savedEvent = await event.save();

    // 3. Si hay imagen, renombrarla con el ID del evento
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newFileName = `${savedEvent._id}${ext}`;
      const newPath = path.join(__dirname, '../../public/images', newFileName);

      fs.renameSync(req.file.path, newPath);

      // 4. Actualizar el evento con el nombre de la imagen
      savedEvent.image = `images/${newFileName}`;
      await savedEvent.save();
    }

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar el evento' });
  }
});

export default router;