var encrypt = require('md5');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
module.exports = {
    register_validation: function(body, callback) {
        var valid_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (body.username == null || body.username == "")
            callback("empty username!!", null);
        else if (!(body.email.match(valid_mail)))
            callback("invalid email address!", null);
        else if (body.email == null || body.email == "")
            callback("empty email!!", null);
        else if (body.password == null || body.password == "")
            callback("enter password!!", null);
        else if (body.con_password == null || body.con_password == "")
            callback("empty confirm password!!", null);
        else if (!(encrypt(body.password) == encrypt(body.con_password)))
            callback("You have entered passwords do not match !", null);
        else if (body.firstname == null || body.firstname == "")
            callback("empty firstname!!", null);
        else if (body.lastname == null || body.lastname == "")
            callback("empty lastname!!", null);
        else {
            body.password = encrypt(body.password);
            callback("", body);
        }
    },
    login_validation: function(body, callback) {
        if (body.username == "")
            callback("empty username!", null);
        else if (body.password == "")
            callback("empty password!", null);
        else {
            body.password = encrypt(body.password);
            callback("", body);
        }
    },
    validateAddress: function(body, callback) {
        if (body.user_id == null || body.user_id == "") {
            callback("enter user id", null);
        } else if (body.phone_no == null || body.phone_no == "") {
            callback("enter phone no", null);
        } else if (body.address.length) {
            _.forEach(body.address, function(data, key) {
                if (data.city == null || data.city == "") {
                    callback("enter city", null);
                } else if (data.state == null || data.state == "") {
                    callback("enter state", null);
                } else if (data.pin_code == null || data.pin_code == "") {
                    callback("enter pin_code", null);
                } else if (body.address.length == (key + 1)) {
                    callback("", body);
                }
            });
        } else {
            callback("enter address", null)
        }
    },
    authenticate_jwt: function(req, callback) {
        jwt.verify(req.headers.access_token, "jwt_tok", function(err, access_token_data) {
            if (err) {
                next(err);
            } else {
                callback("", access_token_data);
            }
        });
    }
};