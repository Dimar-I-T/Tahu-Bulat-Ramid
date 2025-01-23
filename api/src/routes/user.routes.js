const authMiddleware = require("../middlewares/auth.middleware.js");
const userControllers = require('../controllers/user.controllers.js');
const router = require('express').Router();

router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.post('/add-ulasan', authMiddleware, userControllers.add_ulasan);
router.get('/get-my-info', authMiddleware, userControllers.get_my_info);
router.get('/get-all', authMiddleware, userControllers.get_all_users);
module.exports = router;
