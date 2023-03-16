// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {

    public async loginShow({view}){
        return view.render('auth/login');
    }

    public async registerShow({view}){
        return view.render('auth/register');
    }

    public async register({request, response}){
        const data = await request.validate(RegisterValidator);
        await User.create(data);

        
        return response.redirect().toRoute('auth.login.show');
    }

    public async login({request, response, auth}){
        const { uid, password } = request.only(['uid', 'password']);
        await auth.attempt(uid, password);
        return response.redirect().toRoute('auth.profile');

    }

    public async logout({auth, response}){
        await auth.logout();
        return response.redirect().toRoute('auth.login.show');
    }
}
