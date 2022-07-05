require('dotenv').config();
// specific à node pour faire des console.log de gros objets
const util = require('util');

const { List, User, Card, Department, Project, Label } = require('./src/models');

async function test() {
    console.log("start test");
    try {

        // const lists = await List.findAll({
        //     include: [
        //         {
        //             association: 'cards',
        //                 include: [{
        //                     association: 'labels',
        //                 }],
        //         },
        //     ],
        //     order: [
        //         ['lst_position', 'ASC'],
        //         ['cards', 'crd_position', 'ASC'],
        //     ]
        // });

        // const parsedList = lists.map((list) => {
        //     const listValue = list.get();

        //     listValue.cards = list.cards.map((card) => {
        //         const cardValue = card.get();

        //         cardValue.labels = card.labels.map((label) => label.get());
        //         return cardValue;
        //     });

        //     return listValue;

        // });

        const departments = await Department.findAll({
                include: [
                    {
                        association: 'projects', 
                        include: [{
                            association: 'lists',
                        }],
                    },
                ],
                
            });
        const parsedProjects = departments.map((department) => {
            const departmentValue = department.get();

            departmentValue.projects = department.projects.map((project) => {
                const projectValue = project.get();

                projectValue.lists = project.lists.map((list) => list.get());
                return projectValue;
            });

            return departmentValue;

        });
        
        console.log(
            util.inspect(parsedProjects, { showHidden: false, depth: null, colors: true }),
          );

    }catch(error) {
        console.error(error);
    }

}

test();