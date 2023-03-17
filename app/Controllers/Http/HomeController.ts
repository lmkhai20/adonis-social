// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post";

export default class HomeController {
    public async index({view, auth, response}){
        if(!auth.isAuthenticated){
            return response.redirect().toRoute('auth.login.show');
        }
        await auth.user?.preload('followings');
        const followings = auth.user!.followings.map(f => f.followingId);
        const userIds = [auth.user!.id, ...followings ?? []];

        const posts = await Post.query().whereIn('userId', userIds).preload('user').orderBy('created_at', 'desc');
        return view.render('welcome', {posts});
    }
}
