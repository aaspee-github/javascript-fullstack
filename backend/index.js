if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 3500);

// middlewares
app.use(morgan('dev'));
app.use(cors());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/books', require('./routes/books'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    // console.log(`Server on port ${app.get('port')}`);
});