const express = require("express");
const app = express();
const user_router = require('./src/routes/user.routes.js');
const ulasan_router = require('./src/routes/ulasan.routes.js');
const pesanan_router = require('./src/routes/pesanan.routes.js');
const cors = require('cors');
require("./src/configs/mongo.config").connectDB();
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ["https://tahu-bulat-ramid-app.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.get('/', async(req, res) => {
    res.send("hello");
})

app.use('/api/user', user_router);
app.use('/api/ulasan', ulasan_router);
app.use('/api/pesanan', pesanan_router);

app.listen(5001);