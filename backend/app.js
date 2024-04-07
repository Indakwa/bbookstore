require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/routes');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());



// Configure Cloudinary with your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer middleware configuration for file uploads
const upload = multer({ dest: 'uploads/' }); // Destination folder for temporary storage of uploaded files
app.use(upload.fields([
  { name: 'epub', maxCount: 1 }, // EPUB file
  { name: 'coverImage', maxCount: 1 }, // Cover image file
  { name: 'copyright', maxCount: 1 } // Copyright file
]));

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

