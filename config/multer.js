import multer from 'multer';  // Asegúrate de que esté importado
import path from 'path';
import { fileURLToPath } from 'url';  // Importamos fileURLToPath
import { dirname } from 'path';  // Importamos dirname

// Obtenemos la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));  // Cambié la ruta a public/images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Usamos el timestamp para evitar sobrescribir
  }
});

const upload = multer({ storage });

export default upload;
