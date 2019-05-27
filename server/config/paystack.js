export default () => ({
    secret: process.env.PAYSTACK_SECRET_KEY,
    public: process.env.PAYSTACK_PUBLIC_KEY
});
