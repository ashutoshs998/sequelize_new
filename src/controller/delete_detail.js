import db from '../db';
var validation = require('../providers/validation');
module.exports = {
    delete_data: (req, res, next) => {
        validation.authenticate_jwt(req, function(err, data) {
            db.users.delete(data).then((data) => {
                res.json({ error: 0, message: "successfully deleted", data: data })
            }).catch(err => next(err))
        });
    }
}