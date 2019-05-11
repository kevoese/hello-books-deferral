exports.up = knex =>
    knex.schema.table('users', t => {
        t.jsonb('settings').notNull();
    });

exports.down = knex =>
    knex.schema.table('users', t => {
        t.dropColumn('settings');
    });
