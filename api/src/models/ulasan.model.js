const mongoose = require("mongoose");
const UlasanSchema = new mongoose.Schema({
    ulasan: {
        type: [[String]],
        default: []
    },

    bintang: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Ulasan", UlasanSchema);