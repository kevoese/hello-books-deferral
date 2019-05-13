import User from '@models/User';

const getAllUsers = async (req, res) => {
    const { page } = req.query || 0;
    const users = await User.query().page(page, 10);

    return res.status(200).jsend({
        users
    });
};

const update = async (req, res) => {
    const { user_id } = req.params;
    const { firstName, lastName } = req.body;

    const user = await User.query().patchAndFetchById(user_id, {
        firstName,
        lastName
    });

    return res.status(200).jsend(user);
};

const remove = async (req, res) => {
    const { user_id } = req.params;

    await User.query().deleteById(user_id);

    return res.status(200).jsend({
        message: 'User deleted successfully'
    });
};

const changeAccessLevel = async (req, res) => {
    const { user_id } = req.params;
    const { role } = req.body;

    const user = await User.query().patchAndFetchById(user_id, {
        role
    });

    return res.status(200).jsend(user);
};

export default {
    getAllUsers,
    update,
    remove,
    changeAccessLevel
};
