import Fines from '@models/Fines';

const addFine = async (req, res) => {
    const { description, amount, type } = req.body;
    const user_id = req.params.userId;
    const userFine = await Fines.query().insert({
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

    const userFine = await Fines.query().findById(fineId);

    return res.status(200).jsend(userFine);
};

const deleteFine = async (req, res) => {
    const { fineId } = req.params;

    await Fines.query().deleteById(fineId);

    return res.status(200).jsend({
        message: 'Fine succesfully deleted'
    });
};

export default { addFine, getFine, deleteFine };
