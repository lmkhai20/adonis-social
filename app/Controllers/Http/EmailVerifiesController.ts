// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import { DateTime } from "luxon";


export default class EmailVerifiesController {
    public async index({response, auth}){
        auth.user.sendVerificationEmail();
        return response.redirect('back');
    }

    public async confirm({response, request, params}){
        if(request.hasValidSignature()){
            const user = await User.findByOrFail('email', params.email);
            user.email_verified_at = DateTime.local();
            user.save();
            return response.redirect().toRoute('auth.profile');       
        }else{
            return 'Invalid Token'
        }
    }
}
