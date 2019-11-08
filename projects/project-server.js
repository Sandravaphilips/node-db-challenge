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
        const newTask = await Project.addTask({ description, notes, completed, project_id: id});
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json(err)
    }
})

server.put('/projects/:id', validateId, async(req, res) => {
    const {id} = req.params;
    try {
        const updatedProject = await Project.updateProject(id, req.body);
        res.status(201).json(updatedProject);
    } catch (err) {
        res.status(500).json(err)
    }
})

server.put('/tasks/:id', validateId, async(req, res) => {
    const {id} = req.params;
    try {
        const updatedTask = await Project.updateTask(id, req.body);
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err)
    }
})

server.delete('/projects/:id', validateId, async(req, res) => {
    const {id} = req.params;
    try {
        const deletedProject = await Project.getById("projects", id);
        await Project.deleteProject(id);
        res.status(200).json(deletedProject);
    } catch (err) {
        res.status(500).json(err)
    }
})

server.put('/tasks/:id', validateId, async(req, res) => {
    const {id} = req.params;
    try {
        const deletedTask = await Project.getById('tasks', id);
        await Project.deleteTask(id);
        res.status(201).json(deletedTask);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = server;

