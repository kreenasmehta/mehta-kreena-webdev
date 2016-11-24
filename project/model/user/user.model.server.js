/**
 * Created by kreenamehta on 11/23/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function updateUser(userId, user) {
        return UserModel.update({
            _id:userId
        },{
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

};