exports.up = knex =>
    knex.schema.table('users', t => {
        t.json('settings').nullable();
    });

exports.down = knex =>
    knex.schema.table('users', t => {
        t.dropColumn('settings');
    });
