import BookRequest from '@models/BookRequest';

const requestBook = async (req, res) => {
    const { description } = req.body;
    const { email, firstName, lastName } = req.user;
    const name = `${firstName} ${lastName}`;

    await BookRequest.query().insert({
        name,
        email,
        description
    });

    return res.status(201).jsend({
        message: 'Your request has been noted'
    });
};

const getAllRequests = async (req, res) => {
    const requests = await BookRequest.query();

    res.status(200).jsend({
        data: requests
    });
};

export default { requestBook, getAllRequests };
