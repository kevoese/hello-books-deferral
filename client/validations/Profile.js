import * as Yup from 'yup';

export const ProfileValidator = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),
    bio: Yup.string()
});
