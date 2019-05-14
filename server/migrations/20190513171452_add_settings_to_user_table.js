exports.up = knex =>
    knex.schema.table('users', table => {
        table.json('settings').nullable();
    });

exports.down = knex =>
    knex.schema.table('users', table => {
        table.dropColumn('settings');
    });
