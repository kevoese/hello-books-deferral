import crypto from 'crypto';
import config from '@config';
import bcrypt from 'bcryptjs';
import Mail from 'friendly-mail';
import { Model } from 'objection';

class User extends Model {
    static tableName = 'users';

    async $beforeInsert(context) {
        await super.$beforeInsert(context);

        this.password = await bcrypt.hash(this.password, 10);
        this.email_confirm_code = crypto.randomBytes(16).toString('hex');
    }

    async $afterInsert(context) {
        await super.$afterInsert(context);

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
}

export default User;
