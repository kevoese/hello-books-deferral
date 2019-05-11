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

    const token = jwt.sign(
        { id: user.id, email: user.email },
        config.auth.secret,
        {
            expiresIn: '12h'
        }
    );

    res.status(201).jsend({
        message: 'User registered',
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

const getResetPage = async (req, res) =>
    res.status(200).render('reset-password/reset', {
        token: req.user.resettoken,
        url: config.server.url
    });

const resetPassword = async (req, res) => {
    await req.user.resetPassword(req.body.password);

    return res.status(200).jsend({
        message: 'password reset successfull'
    });
};

export default {
    signUp,
    verifyEmail,
    sendResetLink,
    getResetPage,
    resetPassword
};
