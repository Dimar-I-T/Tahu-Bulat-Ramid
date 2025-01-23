const Pesanan = require("../models/pesanan.model");
const User = require("../models/user.model");

exports.add_pesanan = async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);
        if (user){
            const {jumlah, bumbu, alamat} = req.body;
            const new_pesanan = new Pesanan({username: user.username, jumlah: jumlah, bumbu: bumbu, alamat: alamat});
            await new_pesanan.save();
            res.status(201).json({success: true, message: "Berhasil menambahkan pesanan", id: u_id.id});
            return {success: true, message: "Berhasil menambahkan pesanan", id: u_id.id}
        }else{
            res.status(201).json({success: false, message: "User tidak ditemukan"})
            return {success: false, message: "User tidak ditemukan"}
        }
    }catch(err){
        return {success: false, message: err.message};
    }
}