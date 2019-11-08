const express = require('express');
const Project = require('./project-model');

const server = express();

server.use(express.json())

server.get('/projects', async(req, res) => {
    try {
        const projects = await Project.getProjects();
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json(err)
    }
})

server.get('/resources', async(req, res) => {
    try {
        const resources = await Project.getResources();
        res.status(200).json(resources)
    } catch (err) {
        res.status(500).json(err)
    }
})

server.get('/tasks', async(req, res) => {
    try {
       const tasks = await Project.getTasks();
       res.status(200).json(tasks); 
    } catch (err) {
        res.status(500).json(err)
    }
})

server.post('/projects', async(req, res) => {
    const {name, description, completed} = req.body;
    try {
        const newProject = await Project.addProject({name, description, completed});
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json(err)
    }
})

server.post('/resources', async(req, res) => {
    const {name, description} = req.body;
    try {
        const newResource = await Project.addResource({name, description});
        res.status(201).json(newResource);
    } catch (err) {
        res.status(500).json(err)
    }
})

server.post('/projects/:id/tasks', async(req, res) => {
    const {id} = req.params;
    const {name, description, notes, completed} = req.body;
    try {
        const newResource = await Project.addResource({name, description, notes, completed, project_id: id});
        res.status(201).json(newResource);
    } catch (err) {
        res.status(500).json(err)
    }
})