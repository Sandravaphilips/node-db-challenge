
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'finish up the mvp', notes: 'make sure to plan your time accordingly', completed: false, project_id: 1},
        {id: 2, description: 'Go through the week\'s lectures', notes: 'practice the projects', completed: true, project_id: 2}
      ]);
    });
};
