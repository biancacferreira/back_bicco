
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bicco', table =>{
      table.increments('id').primary()
      table.string('specialty')      
      table.string('city')
      table.string('desc')
      table.string('value')
      table.string('from')
      table.string('to')
      table .string('interval')
      table.integer('idProvider').references('id')
        .inTable('login').notNull()
     
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bicco')
};
