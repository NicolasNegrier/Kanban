# Kanban
Mise en place d'un projet kanban

## Interpretation du souhait client

- Le client souhaite un kanban simple qui sera utilisé par service.
- Les agents du service se connecteront afin d'acceder aux projets de leur service.
- Un service peut avoir plusieurs projets qui sont composé d'un kanban.
- Un kanban dispose de liste dans lequelle il y aura des cartes de taches.
- Seulement le manager de service pourra créer ou supprimer un projet et/ou des listes.
- L'agent du service pourra créer, manipuler et supprimer les cartes.
- Les cartes seront déplacables de liste en liste mais interne au projet.
- Seul le manager pourra créer un agent et seulement dans son service.

## Construction MCD / MLD

### MCD

Voir le fichier [MCD](./documentations/MCD.drawio)

### MLD

user: <u>usr_id</u>, usr_firstName, usr_lastName, usr_mail, usr_pwd, usr_role, #usr_dpt_id

department: <u>dpt_id</u>, dpt_name

project: <u>prj_id</u>, prj_name, prj_description, #prj_dpt_id

list: <u>lst_id</u>, lst_name, lst_position, #lst_prj_id

card: <u>crd_id</u>, crd_description, crd_position, #crd_lst_id

label: <u>lbl_id</u>, lbl_name

card_own_label: <u>crdlbl_id</u>, crdlbl_crd_id, crdlbl_lbl_id

## User Stories

|En tant que|Je veux pouvoir| Dans le but de|
|---|---|---|
|Admin|Créer des users| Afin d'acceder aux projets |
|Admin|Attribuer un role user| Afin d'avoir des droits sur les projets |
|Admin|supprimer des users| Afin de mettre à jour la liste |
|Admin|Créer des services| Afin d'acceder aux projets |
|Admin|modifier les services| Afin d'ajouter ou supprimer des users |
|User avec droit|Créer un projet| Afin de créer un nouveau projet pour le service |
|User avec droit|Modifier un projet| Afin de modifier les informations du projet |
|User avec droit|Supprimer un projet| Afin de supprimer le projet |
|User avec droit|Créer un label| Afin de créer un label utilisable sur les cartes |
|User avec droit|Modifier un label| Afin de modifier les informations d'un label utilisable sur les cartes |
|User avec droit|Supprimer un label| Afin de supprimer un label utilisé sur les cartes |
|User|Creer une liste| Afin de créer une nouvelle liste |
|User|Modifier une liste| Afin de modifier une nouvelle liste |
|User|Deplacer une liste| Afin de déplacer une liste dans le board|
|User|Supprimer une liste| Afin de supprimer une liste du board |
|User|Afficher les projets| Afin de choisir les projets accessibles suivant sont service |
|User|Attribuer les listes| Afin de consulter les listes du projet selectionné |
|User|Creer une carte| Afin de créer une nouvelle carte |
|User|Modifier une carte| Afin de modifier une nouvelle carte |
|User|Deplacer une carte dans la liste| Afin de déplacer une carte dans une meme liste|
|User|Deplacer une carte dans le board| Afin de déplacer une carte d'une liste à une autre|
|User|Supprimer une carte| Afin de supprimer une carte du board |
|User|Attribuer un label| Afin d'attribuer un label à une carte du board |
|User|Détacher un label| Afin retirer un label d'une carte du board |
|User|Afficher les labels| Afin de choisir le label à attribuer à la carte |

## DataBase

Voir le fichier [kanban.sql](./documentations/kanban.sql) 

## Mise en place de la structure de l'API

- Création du .env et du .gitignore
- Création du fichier racine app.js
- Création du fichier src qui contiendra les dossiers controllers, dataViews, middlewares et models ainsi que notre fichier database.js et router.js