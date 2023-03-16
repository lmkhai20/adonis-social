// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Application from '@ioc:Adonis/Core/Application'
import { UserFactory } from "Database/factories";

export default class ProfilesController {

    public async index({view, params }){
        const username = params.username;
        const user = await User.findBy('username', username);

        

        if(!user){
            return view.render('errors/not-found');
        }

        await user.preload('posts');
        
        return view.render('profile', {user});
    }

    public async edit({view}){
        return view.render('accounts/edit');
    }

    public async update({auth, request, response}){
        const user = auth.user;
        const avatar = request.file('avatar');
        if(avatar){
            const imageName = new Date().getTime().toString() + `.${avatar.extname}`;
            await avatar.move(Application.publicPath('images'), { name: imageName});
            user.avatar = `images/${imageName}`;          
        }

        
        user.details = request.input('details');
        await user.save();
        return response.redirect(`/${user.username}`);
    }
}
