const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
	firstName: {
        type: String,
        maxLength: 100
    },
    lastName: {
        type: String,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    token: {
        type: String
    }
}, { timestamps: true});

const User = mongoose.model('Users', userSchema);

exports.hashUserPassword = (userPass) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(userPass).digest("base64");
    
    return salt + "$" + hash;
}

exports.registerUser = (userData) => {
	const user = new User(userData);
	return user.save();
};

exports.getAllUsers = async () => {
    const users = []
    for await (let user of User.find()) {
        user = user.toJSON();
        delete user.__v;
        users.push(user);
    }

    return users;
};

exports.findUserById = (userId) => {
    return User.findById(userId).then((user) => {
        user = user.toJSON();
        delete user._id;
        delete user.__v;
        return user;
    });
};

exports.patchUser = (userId, userData) => {
    return User.findOneAndUpdate({
        _id: userId
    }, userData);
};

exports.removeById = (userId) => {
    return User.findByIdAndDelete(userId);
};