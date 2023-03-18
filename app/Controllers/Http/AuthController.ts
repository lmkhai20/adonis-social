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
        const req = await request.validate(RegisterValidator);
        // user.sendVerificationEmail();
        // await User.create(user);

        // send email
        const user = new User;
        user.name = req.name;
        user.username = req.username;
        user.email = req.email;
        user.password = req.password;
        await user.save();

        user.sendVerificationEmail();

        return response.redirect().toRoute('auth.login.show');
    }

    public async login({request, response, auth}){
        const { uid, password } = request.only(['uid', 'password']);
        // const user = await auth.attempt(uid, password);
        await auth.attempt(uid, password);
        return response.redirect('/');
        // return response.redirect(`${user.username}`);

    }

    public async logout({auth, response}){
        await auth.logout();
        return response.redirect().toRoute('auth.login.show');
    }
}
