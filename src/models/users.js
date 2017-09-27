import config from '../../../config.json'
var validation = require('../providers/validation');
var jwt = require('jsonwebtoken');
import models from "../models";
import db from '../db';
export default function(sequelize, DataTypes) {
    let users = sequelize.define('users', {
        username: { type: DataTypes.STRING, required: true, unique: true },
        email: { type: DataTypes.STRING, required: true, unique: true },
        password: { type: DataTypes.STRING, required: true },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING
    });
    users.getdata = (data) => {
        return sequelize.sync()
            .then(() => {
                users.create({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                })
            })
    }

    users.login = (data) => {
        return users.find({ where: { username: data.username, password: data.password } }).then((data, next) => {
            var token = jwt.sign({ user_id: data.id }, "jwt_tok", {
                expiresIn: 3600000
            });
            return (token);
        }).catch(err => next(err))
    }

    users.user_list = (req) => {
        req.params.limit = parseInt(req.params.limit);
        return users.findAll({ offset: ((req.params.page) * (req.params.limit)), limit: (req.params.limit) }).then((data, next) => {
            return (data);
        }).catch(err => next(err))
    }

    users.delete = (req) => {
        return users.destroy({ where: { id: req.user_id } }).then((data, next) => {
            return (data);
        }).catch(err => next(err))
    }

    users.get_data = (req) => {
        return users.find({ where: { id: req.user_id }, include: [db.address] }).then((data, next) => {
            return (data);
        }).catch(err => next(err))
    }
    return users
}