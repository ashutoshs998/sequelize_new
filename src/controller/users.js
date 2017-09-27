import db from '../db';
var validation = require('../providers/validation');
module.exports = {
    users_details: (req, res, next) => {
        validation.register_validation(req.body, function(err, data) {
            db.users.getdata(data).then(users => {
                res.json({ error: 0, message: "data inserted", data: data })
            }).catch(err => next(err))
        });
    }
}