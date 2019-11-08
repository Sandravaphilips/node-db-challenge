const db = require('../data/db-config');

module.exports = {
    addResource,
    addProject,
    addTask,
    getResources,
    getProjects,
    getTasks,
    getProjectById
}

function addResource(newResource) {
    return db('resources')
        .insert(newResource)
        .then(([id]) => db('resources').where({id}))
}

function getResources() {
    return db('resources');
}

function addProject(newProject) {
    return db('projects')
        .insert(newProject)
        .then(([id]) => db('projects').where({id}));
}

function getProjects() {
    return db('projects');
}

function addTask(newTask) {
    return db('tasks')
        .insert(newTask)
        .then(([id]) => db('tasks').where({id}))
        
}

function getTasks() {
    return db('tasks as t')
        .join('projects as p', 'p.id', 't.project_id')
        .select('t.id', 't.description', 't.notes', 't.completed', 'p.name as projectName', 'p.description as projectDescription')
}

