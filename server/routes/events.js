import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import express from 'express';
import Event from '../models/Event.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage });

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();  
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      image: null, 
    });

    const savedEvent = await event.save();

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newFileName = `${savedEvent._id}${ext}`;
      const newPath = path.join(__dirname, '../../public/images', newFileName);

      fs.renameSync(req.file.path, newPath);

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