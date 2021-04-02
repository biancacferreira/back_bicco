
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bicco', table =>{
      table.increments('id').primary()
      table.string('desc')
      table.string('location')
      table.string('value')
      table.string('specialty')
      table.integer('idProvider').references('id')
        .inTable('login').notNull()
     
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bicco')
};
