// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post";
import Application from '@ioc:Adonis/Core/Application'
import { schema } from "@ioc:Adonis/Core/Validator";

export default class PostsController {
    public async create({view}){
        return view.render('posts/create');
    }

    public async store({ request, response, auth }){
        
        // const image = request.file('image')
        // const imageName = new Date().getTime().toString() + `.${image.extname}`;
        // await image.move(Application.publicPath('images'), { name: imageName});

        // const post = new Post();
        // post.image = `images/${imageName}`;
        // post.caption = request.input('caption');
        // post.user_id = auth.user.id;
        // post.save();
        // return response.redirect(`/${auth.user.username}`);
        
        const req = await request.validate({
            schema: schema.create({
              caption: schema.string({}),
              image: schema.file({
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'svg'],
              })
            }),
            messages: {
              "caption.required": "Email field is required",
              "image.required": "Password field is required"
            },
          });
      
          const imageName = new Date().getTime().toString() + `.${req.image.extname}`
          await req.image.move(Application.publicPath('images'), {
            name: imageName
          })
          const post = new Post()
          post.image = `images/${imageName}`
          post.caption = req.caption
          post.userId = auth.user.id
          post.save()
          return response.redirect(`/${auth.user.username}`)

    }

    public async show({ view, params }) {
      const post = await Post.findBy('id', params.id);
      return view.render('posts/show', {post});
    }
}
