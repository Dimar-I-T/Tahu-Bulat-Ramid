const authMiddleware = require("../middlewares/auth.middleware.js");
const ulasanControllers = require('../controllers/ulasan.controllers.js');
const router = require('express').Router();

router.post('/add-ulasan', authMiddleware, ulasanControllers.add_ulasan);
router.get('/get-all-ulasan', ulasanControllers.get_all_ulasan);
module.exports = router;
