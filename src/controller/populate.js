import db from '../db';
var validation = require('../providers/validation');
module.exports = {
    get_data: (req, res, next) => {
        validation.authenticate_jwt(req, function(err, data) {
            db.users.get_data(data).then((data) => {
                res.json({ error: 0, message: "successfully logged in", data: data })
            })
        })
    }
}