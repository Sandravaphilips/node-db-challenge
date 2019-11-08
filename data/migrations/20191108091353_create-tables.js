
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', table => {
      table.increments();
      table.string("name", 128).notNullable()
      table.varchar('description', 256)
      table.boolean('completed').defaultTo(false)
    })
    .createTable('resources', table => {
        table.increments()
        table.string('name', 128).unique().notNullable()
        table.varchar('description', 256)
        
    })
    .createTable('tasks', table => {
        table.increments()
        table.varchar('description', 256).notNullable()
        table.varchar('notes', 128)
        table.boolean('completed').defaultTo(false)
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
    })
    .createTable('ProjectResources', table => {
        table.increments()
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
        table.integer('resource_id').unsigned().notNullable().references('id').inTable('resources')
        
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ProjectResources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
