const authMiddleware = require("../middlewares/auth.middleware.js");
const pesananControllers = require('../controllers/pesanan.controllers.js');
const router = require('express').Router();

router.post('/add-pesanan', authMiddleware, pesananControllers.add_pesanan);
module.exports = router;
