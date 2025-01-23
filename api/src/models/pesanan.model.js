const mongoose = require("mongoose");
const PesananSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    
    jumlah: {
        type: Number,
        default: 1
    },

    bumbu: {
        type: [Number],
        default: [0, 0, 0]
    },

    alamat: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Pesanan", PesananSchema);