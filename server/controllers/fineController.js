import Fine from '@models/Fine';

const getFines = async (req, res) => {
    const userFines = await Fine.query().where({ user_id: req.user.id });

    return res.jsend(userFines);
};

const addFine = async (req, res) => {
    const { description, amount, type } = req.body;
    const user_id = req.params.userId;
    const userFine = await Fine.query().insert({
        description,
        amount,
        type,
        user_id
    });

    return res.status(201).jsend({
        message: 'Fine added',
        userFine
    });
};

const getFine = async (req, res) => {
    const { fineId } = req.params;

    const userFine = await Fine.query().findById(fineId);

    return res.status(200).jsend(userFine);
};

export default { addFine, getFine, getFines };
