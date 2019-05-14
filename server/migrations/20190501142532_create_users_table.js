exports.up = knex =>
    knex.schema.createTable('users', table => {
        table
            .increments('id')
            .unsigned()
            .primary();
        table.string('firstName').notNull();
        table.string('lastName').notNull();
        table
            .string('email')
            .unique()
            .notNull();
        table.string('password').notNull();
        table
            .enu('role', ['super_admin', 'admin', 'patron'])
            .defaultTo('patron');
        table.timestamps();
        table.string('email_confirm_code');
        table.string('bio');
        table.string('avatar');
    });

exports.down = knex => knex.schema.dropTable('users');
