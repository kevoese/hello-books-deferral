import auth from '@routes/v1/auth';
import author from '@routes/v1/author';
import books from '@routes/v1/books';
import fines from '@routes/v1/fines';

export default app => {
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/authors', author);
    app.use('/api/v1/books', books);
    app.use('/api/v1/fines', fines);
};
