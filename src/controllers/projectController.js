const { Project } = require('../models');

const projectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll({
        include: [
          {
            association: 'department',
          },
          {
            association: 'lists',
            include:[
              {
                association: 'cards',
                include: ['labels']
              }],
          },
        ],
      });
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  addProject: async (req, res) => {
    // Recuperation des données provenant du body
    const { name, description, dpt_id } = req.body;

    try {
      // Verification des champs
      if (!name) {
        const error = new Error('Champs nom vide');
        return res.status(500).json({ error: error.message });
      }

      if (!description) {
        const error = new Error('Champs description vide');
        return res.status(500).json({ error: error.message });
      }

      // Vérifier que le nom du projet n'existe pas déjà
      const project = await Project.findOne({
        where: { prj_name: name },
      });

      if (project) {
        const error = new Error('Ce projet existe déjà');
        return res.status(500).json({ error: error.message });
      }

      const newProject = await Project.create({
        prj_name: name,
        prj_description: description,
        prj_dpt_id: dpt_id,
      });
      res.json(newProject);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  getOneProject: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findByPk(projectId, {
        include: [
          {
            association: 'department',
          },
          {
            association: 'lists',
            include:[
              {
                association: 'cards',
                include: ['labels']
              }],
          },
        ],
      });

      if (!project) {
        res.status(404).json('Je ne trouve pas ce projet');
      } else {
        res.json(project);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  modifyProject: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findByPk(projectId, {
        include: [
          {
            association: 'department',
          },
          {
            association: 'lists',
            include:[
              {
                association: 'cards',
                include: ['labels']
              }],
          },
        ],
      });

      if (!project) {
        res.status(404).json('Je ne trouve pas ce projet');
      }

      const { name, description, dpt_id } = req.body;

      // Vérifier que le project n'existe pas déjà
      const projectBdd = await Project.findOne({
        where: { prj_name: name },
      });

      if (projectBdd) {
        const error = new Error('Ce nom de projet est déjà utilisé');
        return res.status(500).json({ error: error.message });
      }

      if (name) {
        project.prj_name = name;
      }

      if (description) {
        project.prj_description = description;
      }

      if (dpt_id) {
        project.prj_dpt_id = dpt_id;
      }

      await project.save();
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  deleteProject: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findByPk(projectId);

      if (!project) {
        res.status(404).json('Je ne trouve pas ce projet');
      } else {
        await project.destroy();
        res.json('Projet supprimé');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },
};

module.exports = projectController;
