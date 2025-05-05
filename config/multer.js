import multer from 'multer';  s
import path from 'path';
import { fileURLToPath } from 'url';  
import { dirname } from 'path';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../src/uploads'));  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

export default upload;
