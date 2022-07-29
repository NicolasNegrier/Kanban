const { List } = require('../models');

const listController = {
  getAllLists: async (req, res) => {
    try {
      const list = await List.findAll({
        include: [
          {
            association: 'cards',
            include: [ 'labels'],
          },
          {
            association: 'project',
          },
        ],
      });
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  addList: async (req, res) => {
    // Recuperation des données provenant du body
    const { name, prj_id } = req.body;

    try {
      // Verification des champs
      if (!name) {
        const error = new Error('Champs nom vide');
        return res.status(500).json({ error: error.message });
      }

      // Vérifier que le service n'existe pas déjà
      const list = await List.findOne({
        where: { lst_name: name, lst_prj_id: prj_id },
      });

      if (list && (prj_id === list.lst_prj_id)) {
        const error = new Error('Ce nom de liste est déjà utilisé');
        return res.status(500).json({ error: error.message });
      }

      const newList = await List.create({
        lst_name: name,
        lst_prj_id: prj_id,
      });
      res.json(newList);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  getOneList: async (req, res) => {
    const listId = req.params.id;

    try {
      const list = await List.findByPk(listId, {
        include: [
            {
              association: 'cards',
              include: [ 'labels'],
            },
            {
              association: 'project',
            },
          ],
      });

      if (!list) {
        res.status(404).json('Je ne trouve pas cette liste');
      } else {
        res.json(list);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  modifyList: async (req, res) => {
    const listId = req.params.id;

    try {
      const list = await List.findByPk(listId, {
        include: [
            {
              association: 'cards',
              include: [ 'labels'],
            },
            {
              association: 'project',
            },
          ],
      });

      if (!list) {
        res.status(404).json('Je ne trouve pas cette liste');
      }

      const { name, prj_id } = req.body;

      // Vérifier que le service n'existe pas déjà
      const listBdd = await List.findOne({
        where: { lst_name: name, lst_prj_id: prj_id },
      });

      console.log(listBdd);
      if (listBdd && (prj_id === listBdd.lst_prj_id)) {
        const error = new Error('Ce nom de liste est déjà utilisé');
        return res.status(500).json({ error: error.message });
      }

      if (name) {
        list.lst_name = name;
      }

      await list.save();
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  deleteList: async (req, res) => {
    const listId = req.params.id;

    try {
      const list = await List.findByPk(listId);

      if (!list) {
        res.status(404).json('Je ne trouve pas cette liste');
      } else {
        await list.destroy();
        res.json('Liste supprimée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },
};

module.exports = listController;
