const express = require('express');
const helmet = require('helmet');
const Project = require('./project-model');

const server = express();

server.use(helmet())
server.use(express.json())

const convertToBoolean = async(req, res, next) => {
    if (req.originalUrl === '/projects') {
        const projects = await Project.getProjects();
        const truthyOrFalsyProjects = projects.map(project => {
            if(project.completed === 1){
                return {...project, completed: true};
            } else return {...project, completed: false};
        })
        req.value = truthyOrFalsyProjects
        next()
    } else if(req.originalUrl === '/tasks') {
        const tasks = await Project.getTasks();
        const truthyOrFalsyTasks = tasks.map(task => {
            if(task.completed === 1){
                return {...task, completed: true};
            } else return {...task, completed: false};
        })
        req.value = truthyOrFalsyTasks
        next()
    } else if(req.url === '/projects/:id') {
        const project = await Project.getProjectById(req.params.id);
        let projectToRender;
        if(project.completed === 1){
            projectToRender =  {...project, completed: true};
        } else{ 
            projectToRender =  {...project, completed: false};
        }
        
        req.value = projectToRender
        next()
    } 
     
}

const validateId = (req, res, next) => {
    const {id} = req.params;
    if (!id) {
      res.json({message: "please provide a valid id"})
    } else {
      next()
    }
};

server.get('/projects/:id', validateId, async (req, res) => {
    try {
        const project = await Project.getProjectById(req.params.id);
        res.status(200).json(project)
        
    } catch (err) {
        res.status(500).json(err)
    }
})

server.get('/projects', convertToBoolean, async(req, res) => {
    try {
        res.status(200).json(req.value)
        
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

server.get('/tasks', convertToBoolean, async(req, res) => {
    try {
        
        res.status(200).json(req.value);
        
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

server.post('/projects/:id/tasks',validateId, async(req, res) => {
    const {id} = req.params;
    const { description, notes, completed} = req.body;
    try {
        const newResource = await Project.addTask({ description, notes, completed, project_id: id});
        res.status(201).json(newResource);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = server;

