const { Department } = require ('../models');

const departmentController = {
    getAlldepartments: async (req, res) => {

        try{
            const department = await Department.findAll({
                include: [
                    {
                        association: 'users'
                    },
                    {
                        association: 'projects'
                    },
                ],
            });
            res.json(department);

        }catch(error) {
            console.error(error);
            res.status(500).json(error.message);
        }

    },

    addDepartment: async (req, res) => {

        // Recuperation des données provenant du body
        const { name } = req.body;

        try {
            
            // Verification des champs
            if (!name) {
                const error = new Error('Champs nom vide');
                return res.status(500).json({error: error.message});
            }
            
            // Vérifier que le service n'existe pas déjà
            const department = await Department.findOne({
                where: {dpt_name : name}
            });

            if (department) {
                const error = new Error('Ce nom de service est déjà utilisé');
                return res.status(500).json({error: error.message});
            }

            const newDepartment = await Department.create({
                dpt_name: name,
            });
              res.json(newDepartment);

        }catch(error) {
            console.error(error);
            res.status(500).json(error.message);
        }

    },

    getOneDepartment: async (req, res) => {

        const departmentId = req.params.id;

        try{
            const department = await Department.findByPk(departmentId, {
                include: [
                {
                    association: 'users'
                },
                {
                    association: 'projects'
                },
            ],
            });

            if (!department) {
                res.status(404).json("Je ne trouve pas ce service");
            }else{
                res.json(department);
            }

        }catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }

    },

    modifyDepartment: async (req, res) => {

        const departmentId = req.params.id;

        try{
            const department = await Department.findByPk(departmentId, {
                include: [
                    {
                        association: 'users'
                    },
                    {
                        association: 'projects'
                    },
                ],
            });

            if (!department) {
                res.status(404).json("Je ne trouve pas ce service");
            }

            const { name } = req.body

            // Vérifier que le service n'existe pas déjà
            const departmentBdd = await Department.findOne({
                where: {dpt_name : name}
            });

            if (departmentBdd) {
                const error = new Error('Ce nom de service est déjà utilisé');
                return res.status(500).json({error: error.message});
            }

            if (name) {
                department.dpt_name = name;
            }

            await department.save();
            res.json(department);

        }catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    deleteDepartment: async (req, res) => {

        const departmentId = req.params.id;

        try{
            const department = await Department.findByPk(departmentId);

            if (!department) {
                res.status(404).json("Je ne trouve pas ce service");
            }else{
                await department.destroy();
                res.json('Service supprimé');
            }

        }catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }

    },
};

module.exports = departmentController;