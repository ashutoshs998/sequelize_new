import db from '../db';
var validation = require('../providers/validation');
module.exports = {
    address_details: (req, res, next) => {
        validation.validateAddress(req.body, function(err, data) {
            db.address.get_address(data).then(users => {
                res.json({ error: 0, message: "data inserted", data: data })
            }).catch(err => next(err))
        });
    }
}