-- demarre la transaction, afin d'être sur si une requete plante rien ne viens modifier partiellement la bdd
BEGIN;

DROP TABLE IF EXISTS user, department, project, list, card, label, card_own_label;

CREATE TABLE department (
    dpt_id SERIAL PRIMARY KEY,
    dpt_name VARCHAR(100) NOT NULL,
    dpt_createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    dpt_updatedAt TIMESTAMP
);

CREATE TABLE user (
    usr_id SERIAL PRIMARY KEY,
    usr_firstName VARCHAR(100) NOT NULL,
    usr_lastName VARCHAR(100) NOT NULL,
    usr_mail VARCHAR(255) NOT NULL UNIQUE,
    usr_pwd VARCHAR(255) NOT NULL,
    usr_role VARCHAR(50) NOT NULL DEFAULT '',
    -- ON DELETE CASCADE pour supprimer automatiquement les cards qui sont dans une list supprimé
    usr_dpt_id INTEGER NOT NULL REFERENCES department(dpt_id) ON DELETE CASCADE,
    usr_createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    usr_updatedAt TIMESTAMP
);

CREATE TABLE project (
    prj_id SERIAL PRIMARY KEY,
    prj_name VARCHAR(100) NOT NULL,
    prj_description VARCHAR(100) NOT NULL,
    prj_dpt_id INTEGER NOT NULL REFERENCES department(dpt_id) ON DELETE CASCADE,
    prj_createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    prj_updatedAt TIMESTAMP
);

CREATE TABLE list (
    lst_id SERIAL PRIMARY KEY,
    lst_name VARCHAR(50) NOT NULL DEFAULT '',
    lst_position SMALLINT NOT NULL DEFAULT 0,
    lst_prj_id INTEGER NOT NULL REFERENCES project(prj_id) ON DELETE CASCADE,
    lst_createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    lst_updatedAt TIMESTAMP
);

CREATE TABLE card (
    crd_id SERIAL PRIMARY KEY,
    crd_description TEXT NOT NULL,
    crd_color VARCHAR(7) NULL,
    crd_position SMALLINT NOT NULL DEFAULT 0,
    crd_lst_id INTEGER NOT NULL REFERENCES list(lst_id) ON DELETE CASCADE,
    crd_createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    crd_updatedAt TIMESTAMP
);

CREATE TABLE label (
    lbl_id SERIAL PRIMARY KEY,
    lbl_name VARCHAR(50) NOT NULL DEFAULT '',
    lbl_createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    lbl_updatedAt TIMESTAMP
);

CREATE TABLE card_own_label (
    crdlbl_id SERIAL PRIMARY KEY,
    crdlbl_crd_id INTEGER NOT NULL REFERENCES card(crd_id) ON DELETE CASCADE,
    crdlbl_lbl_id INTEGER NOT NULL REFERENCES label(lbl_id) ON DELETE CASCADE,
    crdlbl_createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    -- pas de updated_at, car notre table de liaison ne se met jamais à jour, soit on ajoute un element, soit on le supprime, jamais de update
);

-- On insert des données factices

INSERT INTO department(dpt_name)
VALUES ('DSI');

INSERT INTO user(usr_firstName, usr_lastName, usr_mail, usr_pwd, usr_role, usr_dpt_id)
VALUES ('Chuck', 'NORRIS', 'chuck.norris@gmail.com', 'chuck', 'user', 1);

INSERT INTO project(prj_name, prj_description, prj_dpt_id)
VALUES ('Projet 1', 'Le premier projet', 1);

INSERT INTO list(lst_name, lst_prj_id)
VALUES ('ToDo', 1);

INSERT INTO label(lbl_name)
VALUES ('URGENT');

INSERT INTO card(crd_description, crd_position, crd_color, crd_lst_id)
VALUES ('Faire des erreurs volontaires', 0, '#123456', 1),
    ('Corriger les erreurs', 1, NULL, 1);

INSERT INTO card_own_label(crdlbl_crd_id, crdlbl_lbl_id)
VALUES (2, 1);



-- on est a la fin du fichier, donc il n'y a eu aucune erreur, on peut envoyer la transaction vers la BDD
COMMIT;