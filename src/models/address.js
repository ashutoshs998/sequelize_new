import config from '../../../config.json'
var validation = require('../providers/validation');
export default function(sequelize, DataTypes) {
    let address = sequelize.define('address', {
        user_id: { type: DataTypes.STRING, required: true },
        address: DataTypes.JSON,
        phone_no: DataTypes.INTEGER
    });
    address.get_address = (data) => {
        return sequelize.sync()
            .then(() => {
                address.create({
                    user_id: data.user_id,
                    address: data.address,
                    phone_no: data.phone_no
                })
            })
    }
    return address
}