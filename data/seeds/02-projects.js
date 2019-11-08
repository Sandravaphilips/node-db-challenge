
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Sprint Challenge', description: "happens every week", completed: true},
        {id: 2, name: 'Node database', description: "deals with back end", completed: false}
      ]);
    });
};
