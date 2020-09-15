exports.up = function(knex){
    return knex.schema.createTable('users', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('phoneNumber').notNullable();
        table.string('adress').notNullable();
        table.string('permission').notNullable();
        table.string('avatar');
    });
};

exports.down = function(knex){
    return knex.schema.dropTable('users')
};