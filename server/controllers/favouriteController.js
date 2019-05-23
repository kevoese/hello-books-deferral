import Favourite from '@models/Favourite';

const addFavouriteAuthor = async (req, res) => {
    const { id } = req.user;
    const type = 'author';
    const { author_id } = req.body;

    const favourite = await Favourite.query()
        .where('user_id', id)
        .where('favourite_id', author_id)
        .where('favourite_type', type)
        .first();

    if (favourite) {
        return res.status(409).jerror('conflict', `It's already favourited`);
    }

    await Favourite.query().insert({
        user_id: id,
        favourite_id: author_id,
        favourite_type: type
    });

    return res.status(201).jsend({
        message: 'Author Favourited'
    });
};

const unFavouriteAuthor = async (req, res) => {
    const { author_id } = req.params;
    const { id } = req.user;

    const favourite = await Favourite.query()
        .where('user_id', id)
        .where('favourite_id', author_id)
        .where('favourite_type', 'author')
        .first();

    if (!favourite) return res.status(404).jerror('fail', 'not found');

    if (favourite.user_id !== id)
        return res.status(403).jerror('error', 'unAuthorized');

    await Favourite.query().deleteById(favourite.id);

    return res.status(203).jsend({
        message: 'Author has been unFavourited'
    });
};

export default {
    addFavouriteAuthor,
    unFavouriteAuthor
};
