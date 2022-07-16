const { validate } = require('email-validator');
const { hashSync, compareSync } = require('bcrypt');
const { User } = require ('../models');

const userController = {
    getAllUsers: async (req, res) => {

        try{
            const users = await User.findAll({
                include: [
                    {
                        association: 'department'
                    },
                ],
            });
            res.json(users);

        }catch(error) {
            console.error(error)
            res.status(500).json(error.message);
        }

    },

    addUser: async (req, res) => {

        // Recuperation des données provenant du body
        const {
            firstName, lastName, mail, password, passwordConfirm, role, dpt_id
          } = req.body;

        try {
            
            // Verification des champs
            if (!lastName) {
                const error = new Error('Champs nom vide');
                return res.status(500).json({error: error.message});
            }

            if (!firstName) {
                const error = new Error('Champs prenom vide');
                return res.status(500).json({error: error.message});
            }

            if (!mail) {
                const error = new Error('Champs mail vide');
                return res.status(500).json({error: error.message});
            }

            if (!password) {
                const error = new Error('Champs password vide');
                return res.status(500).json({error: error.message});
            }

            if (!passwordConfirm) {
                const error = new Error('Champs confirmation password vide');
                return res.status(500).json({error: error.message});
            }

            // Vérification de l'email
            if (!validate(mail)) {
                const error = new Error('Adresse mail invalide');
                return res.status(500).json({error: error.message});
            }

            // Comparer les mots de passes (password & passwordConfirm)
            if (password !== passwordConfirm) {
                const error = new Error('Les mots de passe ne correspondent pas');
                return res.status(500).json({error: error.message});
            }
            
            // Vérifier que l'email n'est pas déjà utilisé
            const user = await User.findOne({
                where: {usr_mail: mail}
            });

            if (user) {
                const error = new Error('Cette adresse mail existe déjà');
                return res.status(500).json({error: error.message});
            }

            // Hash du mot de passe
            const hashedPassword = hashSync(password, 12);

              const newUser = await User.create({
                usr_firstName: firstName,
                usr_lastName: lastName,
                usr_mail: mail,
                usr_pwd: hashedPassword,
                usr_role: role,
                usr_dpt_id: dpt_id,
              });
              res.json(newUser);

        }catch(error) {
            console.error(error)
            res.status(500).json(error.message);
        }

    },
};

module.exports = userController;