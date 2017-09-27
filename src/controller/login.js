import db from '../db';
var validation = require('../providers/validation');
module.exports = {
    user_login: (req, res, next) => {
        validation.login_validation(req.body, function(err, data) {
            db.users.login(data).then((data) => {
                res.json({ error: 0, message: "successfully logged in", data: data })
            }).catch(err => next(err))
        });
    }
}