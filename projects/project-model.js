const db = require('../data/db-config');

module.exports = {
    addResource,
    addProject,
    addTask,
    getResources,
    getProjects,
    getTasks
}

function addResource(newResource) {
    return db('resources')
        .insert(newResource)
}

function getResources() {
    return db('resources');
}

function addProject(newProject) {
    return db('projects')
        .insert(newProject);
}

function getProjects() {
    return db('projects');
}

function addTask(newTask) {
    return db('tasks')
        .insert(newTask);
}

function getTasks() {
    return db('ProjectResources as pr')
        .join('projects as p', 'p.id', 'pr.project_id')
        .join('tasks as t', 't.id', 'pr.task_id')
        .select('t', 'p.name as projectName', 'p.description as projectDescription')
}