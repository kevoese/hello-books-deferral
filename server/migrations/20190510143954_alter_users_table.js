exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('resettoken').nullable();
        table.dateTime('resetexpire').nullable();
    });
};

exports.down = function(knex, Promise) {
    return Promise;
};
