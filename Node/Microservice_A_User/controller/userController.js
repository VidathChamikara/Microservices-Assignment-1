const User = require('../model/UserSchema')
const crypto = require('crypto');

const saveUser=(req,resp)=>{
    const {password} = req.body;
    const hashAlgorithm = 'sha512';
    const hashedPassword = crypto.createHash(hashAlgorithm).update(password).digest('hex');
    const userDto = new User({
        id:req.body.id,
        name:req.body.name,
        role:req.body.role,
        email:req.body.email,
        password:hashedPassword,
        address:req.body.address
    });
    userDto.save().then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}

const updateUser=(req,resp)=>{
    const {password} = req.body;
    const hashAlgorithm = 'sha512';
    const hashedPassword = crypto.createHash(hashAlgorithm).update(password).digest('hex');
    User.updateOne({id:req.body.id},{
        name:req.body.name,
        role:req.body.role,
        email:req.body.email,
        password:hashedPassword,
        address:req.body.address
    }).then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const getUser=(req,resp)=>{
    User.findOne({id:req.headers.id}).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });

}
const deleteUser=(req,resp)=>{
    User.deleteOne({id:req.headers.id}).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const getAllUser=(req,resp)=>{
    User.find().then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}

const searchUser=(req,resp)=>{
    User.find({
        $or: [
            {id:{$regex:req.headers.text, $options:'i' }},
            {name:{$regex:req.headers.text, $options:'i' }},
            {role:{$regex:req.headers.text, $options:'i' }},
            {email:{$regex:req.headers.text, $options:'i' }},
            {password:{$regex:req.headers.text, $options:'i' }},
            {address:{$regex:req.headers.text, $options:'i' }}

        ]
    }).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}

module.exports= {
    saveUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
    searchUser
}