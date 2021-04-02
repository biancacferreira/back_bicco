
exports.up = function(knex) {
    return knex.schema.createTable('token', table =>{
        table.increments('id').primary()
        table.string('token').notNull().unique()
        table.integer('idUser').references('id')
          .inTable('login').notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('token')
};
