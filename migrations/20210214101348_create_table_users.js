
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login', table =>{
        table.increments('id').primary()
        table.string('email').notNull().unique()
        table.string('password').notNull()
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('login')
};
