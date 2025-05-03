import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import eventsRouter from './routes/events.js';  
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '../.env' });  

const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');  
  },
  filename: (req, file, cb) => {
    // El nombre del archivo será el ID del evento seguido de la extensión .png
    cb(null, 'temp-' + Date.now() + path.extname(file.originalname)); // Temporal para poder asignar el ID después
  },
});

const upload = multer({ storage });

// Servir imágenes estáticas desde 'public/images'
app.use('/images', express.static('public/images'));

// Usar el router de eventos
app.use('/api/events', eventsRouter);

// Conectar a MongoDB
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;  // URI de MongoDB desde .env

if (!MONGO) {
  console.error("MongoDB URI no está definida en el archivo .env");
  process.exit(1);  // Termina el proceso si no se encuentra la URI
}

mongoose.connect(MONGO)
  .then(() => {
    console.log('🗄️  MongoDB conectado');
    app.listen(PORT, () => console.log(`🚀 Server corriendo en puerto ${PORT}`));
  })
  .catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);  // Termina el proceso si no se puede conectar a la base de datos
  });

// Rutas para crear un evento con una imagen
app.post('/api/events', upload.single('image'), async (req, res) => {
  try {
    // Recoger los datos del evento del cuerpo de la solicitud
    const { title, description, date, time, location, category } = req.body;

    // Crear el nuevo evento sin la imagen aún
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
    });

    // Guardamos el evento para obtener el ID
    const savedEvent = await event.save();

    // Asignar el nombre del archivo con el ID del evento
    const imagePath = `/images/${savedEvent._id}.png`;

    // Renombramos la imagen de forma temporal a la del ID del evento
    const oldPath = path.join('public/images', req.file.filename);
    const newPath = path.join('public/images', `${savedEvent._id}.png`);

    // Renombrar la imagen
    fs.renameSync(oldPath, newPath);

    // Actualizamos el evento con la ruta de la imagen
    savedEvent.image = imagePath;
    await savedEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
