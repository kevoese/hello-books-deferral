import { Model } from 'objection';
import User from '@models/User';

class Fines extends Model {
    static tableName = 'fines';

    static relationMappings = {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'fines.user_id',
                to: 'users.id'
            }
        }
    };
}

export default Fines;
