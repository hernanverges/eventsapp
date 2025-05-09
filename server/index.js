import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import eventsRouter from './routes/events.js';  
import dotenv from 'dotenv';
import fs from 'fs';
import usersRoutes from './routes/users.js';


dotenv.config({ path: '../.env' });  

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');  
  },
  filename: (req, file, cb) => {
    cb(null, 'temp-' + Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.use('/api/events', eventsRouter);

app.use('/uploads', express.static('src/uploads'));

app.use('/api/events', eventsRouter);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;  

if (!MONGO) {
  console.error("MongoDB URI no está definida en el archivo .env");
  process.exit(1);  
}

mongoose.connect(MONGO)
  .then(() => {
    console.log('🗄️  MongoDB conectado');
    app.listen(PORT, () => console.log(`🚀 Server corriendo en puerto ${PORT}`));
  })
  .catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);  
  });

//CREATE AND SAVE EVENTS//
app.post('/api/events', upload.single('image'), async (req, res) => {
  try {
    
    const { title, description, date, time, address, city, province, price, category } = req.body;

    
    const event = new Event({
      title,
      description,
      date,
      time,
      address,
      city,
      province,
      price,
      category,
    });

    //RENAME IMAGES//
    const savedEvent = await event.save();

    const imagePath = `/images/${savedEvent._id}.png`;

    const oldPath = path.join('src/uploads', req.file.filename);
    const newPath = path.join('src/uploads', `${savedEvent._id}.png`);

    fs.renameSync(oldPath, newPath);

    savedEvent.image = imagePath;
    await savedEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
