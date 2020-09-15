exports.up = function(knex){
    return knex.schema.createTable('orders', function(table){
        table.string('id').primary();
        table.string('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE');
        table.string('order');
        table.string('priece');
        table.timestamp('createdAt');
        table.timestamp('deliveryAt');
    });
};

exports.down = function(knex){
    return knex.schema.dropTable('orders')
};