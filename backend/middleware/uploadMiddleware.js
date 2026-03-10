const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // IMPORTANT: यह 'uploads' फोल्डर आपके backend फोल्डर में मौजूद होना चाहिए
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // FIX 1: स्पेलिंग ठीक की 'allowedTypes'
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  // FIX 2: 'include' की जगह 'includes' (सही JavaScript मेथड)
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;