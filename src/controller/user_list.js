import db from '../db';
var validation = require('../providers/validation');
module.exports = {
    get_user_list: (req, res, next) => {
        validation.authenticate_jwt(req, function(err, access_token_data) {
            db.users.user_list(req).then((data) => {
                res.json({ error: 0, message: "user list", data: data })
            }).catch(err => next(err))
        })
    }
}