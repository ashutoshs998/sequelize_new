import { Router } from 'express';
import controller from "../controller";
export default () => {
    let api = Router({ mergeParams: true });
    api.route('/user/register/').post(controller.users.users_details);
    api.route('/user/login/').post(controller.login.user_login);
    api.route('/user/address/').post(controller.address.address_details);
    api.route('/user/delete/').post(controller.delete_detail.delete_data);
    api.route('/user/get/').post(controller.populate.get_data);
    api.route('/user/user_list/:page/:limit').post(controller.user_list.get_user_list);
    return api;
}