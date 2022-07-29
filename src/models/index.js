const List = require('./list');
const Card = require('./card');
const User = require('./user');
const Department = require('./department');
const Project = require('./project');
const Label= require('./label');

// ASSOCIATION USER ET DEPARTMENT

User.belongsTo(Department, {
    as: 'department',
    foreignKey: 'usr_dpt_id',
});

Department.hasMany(User, {
    as: 'users',
    foreignKey: 'usr_dpt_id',
});

// ASSOCIATION DEPARTMENT ET PROJECT

Project.belongsTo(Department, {
    as: 'department',
    foreignKey: 'prj_dpt_id',
});

Department.hasMany(Project, {
    as: 'projects',
    foreignKey: 'prj_dpt_id',
});

/// ASSOCIATION DEPARTMENT ET LABEL

Label.belongsTo(Department, {
    as: 'department',
    foreignKey: 'lbl_dpt_id',
});

Department.hasMany(Label, {
    as: 'labels' ,
    foreignKey: 'lbl_dpt_id'
})

// ASSOCIATION PROJECT ET LIST

List.belongsTo(Project, {
    as: 'project',
    foreignKey: 'lst_prj_id'
});

Project.hasMany(List, {
    as: 'lists',
    foreignKey: 'lst_prj_id',
})

// ASSOCIATION CARD ET LIST

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'crd_lst_id',
});

List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'crd_lst_id',
});

// ASSOCIATION LABEL ET CARD

Card.belongsToMany(Label, {
    as: 'labels',
    through: 'card_own_label',
    foreignKey: 'crdlbl_crd_id',
    otherKey: 'crdlbl_lbl_id',
    timestamps: false,
});

Label.belongsToMany(Card, {
    as: 'cards',
    through: 'card_own_label',
    foreignKey: 'crdlbl_lbl_id',
    otherKey: 'crdlbl_crd_id',
    timestamps: false,
});

module.exports = {
    List,
    Card,
    User,
    Department,
    Project,
    Label,
};