import Book from '@models/Book';
import { Model } from 'objection';

class Author extends Model {
    static tableName = 'authors';

    static relationMappings() {
        return {
            book: {
                relation: Model.ManyToManyRelation,
                modelClass: Book,
                join: {
                    from: 'authors.id',
                    through: {
                        from: 'author_book.author',
                        to: 'author_book.book'
                    },
                    to: 'books.id'
                }
            }
        };
    }
}

export default Author;
