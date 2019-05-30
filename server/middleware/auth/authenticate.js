import User from '@models/User';
import Author from '@models/Author';
import jwt from 'jsonwebtoken';

export const isMaybeAuthenticated = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return next();
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;
        let user = await User.query()
            .where('email', email)
            .first();

        if (!user) {
            return next();
        }

        req.user = user;
        next();
    } catch (error) {
        return next();
    }
};

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).jsend({
            message: 'Unauthenticated'
        });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;
        let user = await User.query()
            .where('email', email)
            .first();

        if (!user) {
            return res.status(400).jsend({
                message: 'Unauthenticated'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).jsend({
            message: 'Unauthenticated'
        });
    }
};

export const isAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(403).jsend({
            message: 'UnAuthorised'
        });
    }
    next();
};

export const isSuperAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'super_admin') {
        return res.status(403).jsend({
            message: 'UnAuthorised'
        });
    }
    next();
};

export const isPatron = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'patron') {
        return res.status(403).jsend({
            message: 'UnAuthorised'
        });
    }
    next();
};

export const userExists = async (req, res, next) => {
    const { user_id } = req.params;
    const user = await User.query().findById(user_id);
    if (!user) {
        return res.status(400).jsend({
            message: 'Unauthenticated'
        });
    }
    next();
};

export const authorExists = async (req, res, next) => {
    const { author_id } = req.body;
    if (!author_id)
        return res.status(400).jerror('error', 'author_id is required');
    const author = await Author.query().findById(author_id);
    if (!author) return res.status(404).jerror('error', 'Not Found');
    next();
};

export default {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    isPatron,
    userExists,
    authorExists,
    isMaybeAuthenticated
};
