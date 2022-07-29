const { Label } = require('../models');

const labelController = {
  getAllLabels: async (req, res) => {
    try {
      const label = await Label.findAll({
        include: [
            {
              association: 'department',
            },
        ],
      });
      res.json(label);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  addLabel: async (req, res) => {
    // Recuperation des données provenant du body
    const { name, dpt_id } = req.body;

    try {
      // Verification des champs
      if (!name) {
        const error = new Error('Champs nom vide');
        return res.status(500).json({ error: error.message });
      }

      // Vérifier que le label n'existe pas déjà
      const label = await Label.findOne({
        where: { lbl_name: name, lbl_dpt_id: dpt_id },
      });

      if (label) {
        const error = new Error('Ce nom de label est déjà utilisé');
        return res.status(500).json({ error: error.message });
      }

      const newLabel = await Label.create({
        lbl_name: name,
        lbl_dpt_id: dpt_id,
      });
      res.json(newLabel);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  getOneLabel: async (req, res) => {
    const labelId = req.params.id;

    try {
      const label = await Label.findByPk(labelId, {
        include: [
            {
              association: 'department',
            },
        ],
      });

      if (!label) {
        res.status(404).json('Je ne trouve pas ce label');
      } else {
        res.json(label);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  modifyLabel: async (req, res) => {
    const labelId = req.params.id;

    try {
      const label = await Label.findByPk(labelId, {
        include: [
            {
              association: 'department',
            },
        ],
      });

      if (!label) {
        res.status(404).json('Je ne trouve pas ce label');
      }

      const { name, dpt_id } = req.body;

      // Vérifier que le service n'existe pas déjà
      const labelBdd = await Label.findOne({
        where: { lbl_name: name, lbl_dpt_id: dpt_id },
      });

      if (labelBdd) {
        const error = new Error('Ce label existe déjà');
        return res.status(500).json({ error: error.message });
      }

      if (name) {
        label.lbl_name = name;
        label.lbl_dpt_id = dpt_id;
      }

      await label.save();
      res.json(label);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  deleteLabel: async (req, res) => {
    const labelId = req.params.id;

    try {
      const label = await Label.findByPk(labelId);

      if (!label) {
        res.status(404).json('Je ne trouve pas ce label');
      } else {
        await label.destroy();
        res.json('Label supprimé');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },
};

module.exports = labelController;
