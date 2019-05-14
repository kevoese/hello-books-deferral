import User from '@models/User';
import config from '@config';
import jwt from 'jsonwebtoken';

const signUp = async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    const user = await User.query().insert({
        firstName,
        lastName,
        password,
        email
    });

    const token = user.getToken();

    res.status(201).jsend({
        message: 'User registered',
        token,
        user
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.query()
        .where({
            email
        })
        .first();

    if (!user) {
        return res.status(400).jerror({
            error: 'Email or password is invalid.'
        });
    }

    if (!user.passwordsMatch(password)) {
        return res.status(400).jerror({
            error: 'Email or password is invalid.'
        });
    }

    const token = user.getToken();

    res.jsend({
        token,
        user
    });
};

const verifyEmail = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.query()
        .where('email_confirm_code', verificationCode)
        .first();

    if (!user) {
        return res.status(400).jerror({
            error: 'Bad Request'
        });
    }

    await User.query()
        .findById(user.id)
        .patch({ email_confirm_code: null });

    return res.status(200).jsend({
        message: 'User verified'
    });
};

const sendResetLink = async (req, res) => {
    await req.user.createResetLink();

    return res.status(200).jsend({
        message: 'Check your email for password reset link.'
    });
};

const resetPassword = async (req, res) => {
    await req.user.resetPassword(req.body.password);

    return res.status(200).jsend({
        message: 'password reset successfull'
    });
};

const createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const password = User.generateRandomPsssword();
    const rawPassword = password;

    const auth_first_name = req.user.firstName;
    const auth_last_name = req.user.lastName;
    const name = `${auth_first_name} ${auth_last_name}`;

    const user = await User.query().insert({
        firstName,
        lastName,
        password,
        email,
        by_admin: true,
        email_confirm_code: null
    });

    const data = {
        name,
        rawPassword
    };

    await user.sendInviteMail(data);

    return res.status(201).jsend({
        message: 'user has been created and mail sent to user'
    });
};

export default {
    login,
    signUp,
    verifyEmail,
    createUser,
    sendResetLink,
    resetPassword
};
