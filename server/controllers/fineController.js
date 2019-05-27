import config from '@config';
import Fine from '@models/Fine';
import Paystack from 'paystack';

const paystack = Paystack(config.paystack.secret);

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

const payFine = async (req, res) => {
    const { fineId, reference } = req.body;

    try {
        const transaction = await paystack.transaction.verify(reference);

        if (!transaction.status) throw new Error();

        await Fine.query()
            .patch({
                status: 'paid',
                paid_at: new Date()
            })
            .findById(fineId);

        return res.jsend({
            message: 'Fine paid successfully.'
        });
    } catch (e) {
        res.status(400).jerror({
            message: 'Payment verification failed.'
        });
    }
};

const getFine = async (req, res) => {
    const { fineId } = req.params;

    const userFine = await Fine.query().findById(fineId);

    return res.status(200).jsend(userFine);
};

export default { addFine, getFine, getFines, payFine };
