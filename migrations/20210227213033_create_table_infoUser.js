
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table =>{
          table.increments('id').primary()
          table.string('name').notNull() 
          table.date('date')
          table.string('avatar')
          table.string('street')
          table.string('district')
          table.string('city')
          table.string('number')
          table.string('cep')
          table.string('state')
          table.string('phone')
          table.integer('idLogin').references('id').inTable('login').notNull()
        })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('users')
  };
  