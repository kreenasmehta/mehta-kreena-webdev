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
        deleteUser: deleteUser,
        findUserByName: findUserByName,
        findUserByIdExtended: findUserByIdExtended,
        findUserByFacebookId: findUserByFacebookId
    };

    return api;

    /**
     * get the extended user, user object populated with follows users
     * @param userId
     * @returns {Promise}
     */
    function findUserByIdExtended(userId) {
        return UserModel
            .findById(userId)
            .populate('follows')
            .exec();
    }

    /**
     * create user
     * @param user
     * @returns {user}
     */
    function createUser(user) {
        return UserModel.create(user);
    }

    /**
     * find user by userId
     * @param userId
     * @returns {*}
     */
    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    /**
     * find user by username
     * @param username
     * @returns {*|Query}
     */
    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }

    /**
     * find user by credentials
     * @param username
     * @param password
     * @returns {*|Query}
     */
    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    /**
     * update user
     * @param userId
     * @param user
     * @returns {*|Query}
     */
    function updateUser(userId, user) {
        return UserModel.update({
            _id:userId
        },{
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dob: user.dob,
            phone: user.phone,
            follows: user.follows
        });
    }

    /**
     * delete user
     * @param userId
     * @returns {Promise}
     */
    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findUserByName(readerName) {
        return UserModel.find(
            {
                firstName: new RegExp(readerName, 'i')
            }
        );
    }

    /**
     * find a user using their facebook id
     * @param facebookId
     * @returns {Query|*}
     */
    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

};