exports.up = knex =>
    knex.schema.table('users', t => {
        t.dropColumn('created_at');
        t.dropColumn('updated_at');
    });

exports.down = knex =>
    knex.schema.table('users', t => {
        t.timestamps();
    });
