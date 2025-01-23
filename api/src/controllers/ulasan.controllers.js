const Ulasan = require("../models/ulasan.model");
const User = require("../models/user.model");

exports.add_ulasan = async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);
        if (user){
            const {ulasan, bintang} = req.body;
            if (ulasan.trim().length > 0){
                const new_ulasan = new Ulasan({ulasan: [[user.username, ulasan]], bintang: bintang});
                await new_ulasan.save();
                res.status(201).json({success: true, message: "Berhasil menambahkan ulasan"});
                return {success: true, message: "Berhasil menambahkan ulasan"}
            }
        }else{
            res.status(201).json({success: false, message: "User tidak ditemukan"})
            return {success: false, message: "User tidak ditemukan"}
        }
    }catch(err){
        return {success: false, message: err.message};
    }
}

exports.get_all_ulasan = async (req, res) => {
    try{
        const ulasans = await Ulasan.find();
        res.status(200).json({success: true, message: "Successfully retrieved all ulasans", data: ulasans});
        return {success: true, message: "Successfully retrieved all ulasans", data: ulasans};
    }catch (error){
        res.status(500).json({message: error.message});
    }
};