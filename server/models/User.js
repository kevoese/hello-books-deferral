import crypto from 'crypto';
import config from '@config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Mail from 'friendly-mail';
import { Model } from 'objection';

class User extends Model {
    static tableName = 'users';

    passwordsMatch(password) {
        return bcrypt.compareSync(password, this.password);
    }

    getToken() {
        return jwt.sign(
            { id: this.id, email: this.email },
            config.auth.secret,
            {
                expiresIn: '12h'
            }
        );
    }

    async $beforeInsert(context) {
        await super.$beforeInsert(context);

        this.password = await bcrypt.hash(this.password, 10);
        this.email_confirm_code = crypto.randomBytes(16).toString('hex');
    }

    async $afterInsert(context) {
        await super.$afterInsert(context);

        if (!this.by_admin) {
            this.sendWelcomeMail();
        }
    }

    async sendWelcomeMail() {
        await new Mail('welcome-mail')
            .to(this.email, this.firstName)
            .data({
                name: this.firstName,
                url: `${config.server.url}/api/v1/auth/verify/${
                    this.email_confirm_code
                }`
            })
            .subject('Welcome Onboard')
            .send();
    }

    async createResetLink() {
        const token = crypto.randomBytes(20).toString('hex');
        const date = new Date();
        date.setHours(date.getHours() + 2);

        await this.constructor
            .knex()
            .table('users')
            .where('email', this.email)
            .update({
                resettoken: token,
                resetexpire: date
            });
        await this.sendResetEmail(token);
    }

    async sendResetEmail(token) {
        await new Mail('reset-password')
            .to(this.email)
            .subject('You requested for a password reset.')
            .data({
                name: this.firstName,
                url: `${config.server.url}/api/v1/auth/reset/${token}`
            })
            .send();
    }

    async resetPassword(password) {
        await this.$query().patch({
            password: bcrypt.hashSync(password),
            resettoken: null,
            resetexpire: null
        });
    }

    async sendInviteMail({ name, rawPassword }) {
        await new Mail('invite-mail')
            .to(this.email, this.firstName)
            .data({
                name: this.firstName,
                email: this.email,
                invitee_name: name,
                password: rawPassword
            })
            .subject('Hello-Books invite mail')
            .send();
    }

    static generateRandomPsssword() {
        return crypto.randomBytes(8).toString('hex');
    }
}

export default User;
