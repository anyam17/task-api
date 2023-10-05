const UserModel = require('../models/users.model');

exports.register = (req, res) => {
    req.body.password = UserModel.hashUserPassword(req.body.password);
    req.body.role = 1;

    UserModel.registerUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.getUsers = (req, res) => {
    UserModel.getAllUsers()
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getUserById = (req, res) => {
    UserModel.findUserById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.updateUserById = (req, res) => {
    if (req.body.password) req.body.password = UserModel.hashUserPassword(req.body.password);

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(200).json({
                message: "User updated successfully!",
                success: true
            });
        });
};

exports.removeUserById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(200).json({
                message: "User deleted successfully!",
                success: true
            });
        });
 };