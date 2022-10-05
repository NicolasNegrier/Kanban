const { Card } = require('../models');

const cardController = {
  getAllCards: async (req, res) => {
    try {
      const card = await Card.findAll({
        include: [
          {
            association: 'list',
          },
          {
            association: 'labels',
          },
        ],
        order: [
            ['crd_position', 'ASC'],
        ],
      });
      res.json(card);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  addCard: async (req, res) => {
    // Recuperation des données provenant du body
    const { description, lst_id } = req.body;

    try {
      // Verification des champs
      if (!description) {
        const error = new Error('Champs description vide');
        return res.status(500).json({ error: error.message });
      }

      const newCard = await Card.create({
        crd_description: description,
        crd_lst_id: lst_id,
      });
      res.json(newCard);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  getOneCard: async (req, res) => {
    const cardId = req.params.id;

    try {
      const card = await Card.findByPk(cardId, {
        include: [
            {
              association: 'list',
            },
            {
              association: 'labels',
            },
          ],
          order: [
              ['crd_position', 'ASC'],
          ]
      });

      if (!card) {
        res.status(404).json('Je ne trouve pas cette carte');
      } else {
        res.json(card);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  modifyCard: async (req, res) => {
    const cardId = req.params.id;

    try {
      const card = await Card.findByPk(cardId, {
        include: [
            {
              association: 'list',
            },
            {
              association: 'labels',
            },
          ],
          order: [
              ['crd_position', 'ASC'],
          ]
      });

      if (!card) {
        res.status(404).json('Je ne trouve pas cette carte');
      }

      const { description, lst_id } = req.body;

      if (description) {
        card.crd_description = description;
        card.crd_lst_id = lst_id;
      }

      await card.save();
      res.json(card);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  deleteCard: async (req, res) => {
    const cardId = req.params.id;

    try {
      const card = await Card.findByPk(cardId);

      if (!card) {
        res.status(404).json('Je ne trouve pas cette carte');
      } else {
        await card.destroy();
        res.json('Carte supprimée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },
};

module.exports = cardController;
