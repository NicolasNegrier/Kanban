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
};

module.exports = userController;