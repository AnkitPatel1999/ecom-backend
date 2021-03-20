const User  = require('../models/User');

exports.signup = (req, res) => {
    const user = User(req.body);
    user.save((err,user) => {
        if(err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            })
        }
        // res.json({
        //     name: user.name,
        //     email: user.email,
        //     id: user._id
        // })
        res.json(user)
    })
};

exports.signin = (req,res) => {
    res.json({
        message: "Signin works!"
    })
}