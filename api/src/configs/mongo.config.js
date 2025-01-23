const mongoose = require("mongoose");
require('dotenv').config();

exports.connectDB = async function () {
    const URI = process.env.mongodb_uri;
    const connectionParams = {};

    mongoose.set("strictQuery", false);

    mongoose.connect(URI, connectionParams).then(() => console.info("Connected to mongodb")).catch((err) => console.error(err.message));
};
