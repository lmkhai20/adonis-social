// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Following from "App/Models/Following";

export default class FollowsController {

    public async store({ params, response, auth }) {
        // store follow user id with auth user id
        const follow = new Following;
        follow.userId = auth.user.id;
        follow.followingId = params.userid;
        await follow.save();

        return response.redirect('back');
    }

    public async destroy({params, response, auth }) {
        const follow = Following.query().where('user_id', auth.user.id).where('following_id', params.userid);
        await follow.delete();
        return response.redirect('back');
    }
}
