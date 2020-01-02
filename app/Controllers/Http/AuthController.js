'use strict'
/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const sgMail = use('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class AuthController {
    async register({request}){
        const data = request.only(['username','email','password']);
        const user = await User.create(data);

        
        const msg = {
            to: user.email,
            from: process.env.EMAIL_APP,
            subject: 'Welcome to Kinema',
            text: `Grettings ${user.username}! Welcome to Kinema App!`,
            html: `<strong>Grettings ${user.username}! Welcome to Kinema App!</strong>`,
        };
        sgMail.send(msg);

        return user;
    }

    async authenticated({request, auth}){
        const {email,password} = request.all();
        const token = await auth.attempt(email,password);

        return token;
    }

    async forgotPassword({request}){
        const {email} = request.all();
        const user = await User.findByOrFail('email',email);
        const password = Math.random().toString(36).substr(2);
       const msg = {
            to: user.email,
            from: process.env.EMAIL_APP,
            subject: 'Alteração de senha',
            text: `Oi, ${user.username}! Uma nova senha foi gerada, através dela você poderá logar no Kinema App e alterar-la! nova senha: ${password}`,
            html: `<strong>Oi, ${user.username}! Uma nova senha foi gerada, através dela você poderá logar no Kinema App e em posterior alterar-la!<p>nova senha: ${password}</p></strong>`,
        };
        sgMail.send(msg);
        user.password=password;
        await user.save();
        
        return user;
    }

    async alterPassword({request,auth}){
        const user = await User.find(auth.user.id);
        const {password} = request.all();
        console.log(password);
        user.password=password;
        
        await user.save();

        return user;
    }
}

module.exports = AuthController
