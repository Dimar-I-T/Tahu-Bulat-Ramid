const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if (user != null){
            res.status(201).json({success: false, message: "Username is already used"});
            return {success: false, message: "Username is already used"};
        }else{
            const hashed = await bcrypt.hash(password, 10);
            const new_user = new User({username: username, password: hashed});
            await new_user.save();
            const token = jwt.sign({id: new_user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, 
                sameSite: "lax"
            });
            
            res.status(201).json({success: true, message: "Successfully created user", data: new_user, token: token});
            return {success: true,  message: "Successfully created user", data: new_user, token: token};
        }
    }catch (error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});

        if (user === null){
            res.status(201).json({success: false, message: "username tidak ada!"});
            return {success: false, message: "username tidak ada!"};
        }else{
            const is_correct = await bcrypt.compare(password, user.password);
            if (is_correct){
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true, 
                    sameSite: "none"
                });

                res.status(201).json({success: true, message: "Successfully logged in", data: user, token: token});
                return {success: true, message: "Successfully logged in", data: user, token: token};
            }else{
                res.status(201).json({success: false, message: "password salah!"});
                return {success: false, message: "password salah!"};
            }
        }
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: err.message});
        return {success: false, message: err.message};
    }
}

exports.get_my_info = async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);
        
        res.status(201).json({success: true, message: "Successfully retrieved user info", data: user});
        return {success: true, message: "Successfully retrieved user info", data: user};
    }catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }
}

exports.get_all_users = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({success: true, message: "Successfully retrieved all users", data: users});
        return {success: true, message: "Successfully retrieved all users", data: users};
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.add_ulasan = async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);

        if (user){
            const ulasan = req.body;
            if (ulasan.ulasan.trim().length > 0){
                user.ulasan.push(ulasan.ulasan);
                await user.save();
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