import Sequelize from "sequelize";
import models from "./models";
import add from "./models/address.js";
import use from "./models/users.js";
import config from "../../config.json";
const db = {};

const sequelize = new Sequelize('users', 'root', 'java@123', { dialect: 'mysql' });
Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize.DataTypes);
    db[modelName] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].options.associate) {
        db[modelName].options.associate(db);
    }
});
sequelize.models.users.hasOne(sequelize.models.address, { foreignKey: 'user_id' })
sequelize.sync().then((data) => {})
export default Object.assign({}, db, {
    sequelize,
    Sequelize
});