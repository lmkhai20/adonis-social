// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post";

export default class HomeController {
    public async index({view}){
        const posts = await Post.query().preload('user');
        return view.render('welcome', {posts});
    }
}
