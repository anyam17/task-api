const UsersController = require('../controllers/users.controller');

exports.userRoutes = (app) => {
    
    app.post('/api/register', [
        UsersController.register
    ]);

    app.get('/api/users', [
        UsersController.getUsers
    ]);

    app.get('/api/user/:userId', [
        UsersController.getUserById
    ]);

    app.patch('/api/user/:userId', [
        UsersController.updateUserById
    ]);

    app.delete('/api/user/:userId', [
        UsersController.removeUserById
    ]);
};