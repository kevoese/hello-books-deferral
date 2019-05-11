import User from '@models/User';

const getUser = async id => {
    const {
        firstName,
        lastName,
        email,
        bio,
        avatar
    } = await User.query().findById(id);

    return { firstName, lastName, email, bio, avatar };
};

const getProfile = async (req, res) => {
    const userId = req.params.id;
    const thisUser = req.user;

    const id = userId ? userId : thisUser.id;

    const user = await getUser(id);
    return res.status(200).jsend(user);
};

const editProfile = async (req, res) => {
    const { id } = req.user;

    const { firstName, lastName, email, bio, avatar } = req.body;

    const update = async (column, value) => {
        await User.query()
            .findById(id)
            .patch({ [column]: value });
    };

    if (firstName) await update('firstName', firstName);
    if (lastName) await update('lastName', lastName);
    if (email) await update('email', email);
    if (bio) await update('bio', bio);
    if (avatar) await update('avatar', avatar);

    const user = await getUser(id);
    return res.status(200).jsend(user);
};

export default { getProfile, editProfile };
