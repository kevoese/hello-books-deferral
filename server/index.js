import { app } from '@server/app';
import consola from 'consola';

const { PORT } = process.env;
const server = app.listen(PORT, () => {
    consola.success(`server start at port ${PORT}`);
});

export default server;
