exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table) {
        table.string('coverImage').nullable();
    });
};

exports.down = function(knex, Promise) {
    return Promise;
};
