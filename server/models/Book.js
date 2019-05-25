import { Model } from 'objection';
import Author from '@models/Author';
import AuthorBook from '@models/AuthorBook';

class Book extends Model {
    static tableName = 'books';

    async attach(authors) {
        for (let index = 0; index < authors.length; index++) {
            const authorId = authors[index];

            const author = await Author.query().findById(authorId);

            if (author) {
                const authorBook = await AuthorBook.query().where({
                    author: authorId,
                    book: this.id
                });

                if (authorBook) return;

                await AuthorBook.query().insert({
                    author: authorId,
                    book: this.id
                });
            }
        }
    }

    static relationMappings() {
        return {
            authors: {
                relation: Model.ManyToManyRelation,
                modelClass: Author,
                join: {
                    from: 'books.id',
                    through: {
                        from: 'author_book.book',
                        to: 'author_book.author'
                    },
                    to: 'authors.id'
                }
            }
        };
    }
}

export default Book;
