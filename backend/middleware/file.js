const multer = require ('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let error= new Error('Invalid file type');
    if (isValid){
      error = null;
    }
    callback(error,"backend/images");
  },
  filename: (req, file, callback) => {
    const name= file.originalname.toLowerCase().split(' ').join('-');
    const extention = FILE_TYPE_MAP[file.mimetype];
    callback(null,name + '-' + Date.now() + '.'+ extention)
  }
});

module.exports = multer({storage: storage}).single("image")
