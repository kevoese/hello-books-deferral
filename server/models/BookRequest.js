import { Model } from 'objection';

class BookRequest extends Model {
    static tableName = 'book_requests';
}

export default BookRequest;
