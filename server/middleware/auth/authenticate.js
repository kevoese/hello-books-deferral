import User from '@models/User';
import jwt from 'jsonwebtoken';

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

        req.user = { id: user.id, email: user.email, role: user.role };
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

const isSuperAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'super_admin') {
        return res.status(403).jsend({
            message: 'UnAuthorised'
        });
    }
    next();
};

const isPatron = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'patron') {
        return res.status(403).jsend({
            message: 'UnAuthorised'
        });
    }
    next();
};

export default {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    isPatron
};
