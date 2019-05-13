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

const filterObj = obj => {
    const validKeys = Object.keys(obj).filter(key => obj[key]);
    const validObject = validKeys.reduce((accum, keys) => {
        return { ...accum, [keys]: obj[keys] };
    }, {});
    return validObject;
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
    const userData = { firstName, lastName, email, bio, avatar };

    // const result = filterObj(userData);

    await User.query()
        .findById(id)
        .patch(filterObj(userData));

    const user = await getUser(id);
    return res.status(200).jsend(user);
};

export default { getProfile, editProfile };
