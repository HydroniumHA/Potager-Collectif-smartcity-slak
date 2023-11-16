DROP TABLE IF EXISTS Account CASCADE;

CREATE TABLE Account (
    email VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    password VARCHAR(60) NOT NULL,
    is_admin BOOLEAN DEFAULT false
);

INSERT INTO Account (email, name, first_name, password, is_admin) VALUES 
('superadmin@slack.be', 'super', 'admin', '$2b$10$dv3c/.ECUGdW3yw0O42XTuV.z3fjDIbegF1nalqRJxNlZeLnPAVFC', true);    --1

INSERT INTO Account (email, name, first_name, password) VALUES 
('logan.stls@gmail.com', 'Staelens', 'Logan', '$2b$10$gqxPAbow6oOLbZh3kkGqLuehHP2j/4En2GSImZb47JNfhywU1BG3u'),      --2
('etu48643@henallux.be', 'Frémy', 'Justin', '$2b$10$ijwQvy3iQTN7ERMIrPuEjudkKENt19NaR7hxDMzVuetLLEVURIK/W'),        --3
('eut5789@henallux.be', 'Marton', 'Cédric', '$2b$10$8ECOBKkPAwyH3ng0NrKBVOgCKXZmhMcrJ0ldWYhpR5t4unbA/xYjy'),        --4
('gesimon8363@gmail.com', 'Georges', 'Simon', '$2b$10$ePgsLSMgbYQjuBwIOw4U2ekh17en1ntjAMReKkfrd2RAl7ouB/Ulq'),      --5
('nathantherasse@gmail.com', 'Therasse', 'Nathan', '$2b$10$5XhCZrhRNX6UteNtcY0.COvkNjtxwJ8ebxOMivU3EeVVbURB6AsFO'), --6 --bidondon1
('cyrilbaras@gmail.com', 'Baras', 'Cyril', '$2b$10$V9pdVOlDn8rZLKoSlBaYLufK4vksB.K/6gIn3Ub1XU9cd93Z8jXAu'); --7

DROP TABLE IF EXISTS Garden CASCADE;

CREATE TABLE Garden (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    date DATE NOT NULL,
    plan JSON NOT NULL
);

INSERT INTO Garden (date, name, address, plan) VALUES
(NOW(), 'Potager Glycosine', 'Rue des Martyrs 33,#4587 Hibou#Belgique', '{
    "meta": {
        "sizeX": 5,
        "sizeY": 4
    },
    "content": [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ]
}'),                                                                            --1

(NOW(), 'Potager Bitumine', 'Rue des Bidonvilles 666,#9999 Baras#Belgique', '{
    "meta": {
        "sizeX": 5,
        "sizeY": 8
    },
    "content": [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ]
}'),                                                                            --2

(NOW(), 'Potager Beyne', 'Rue de la Laderie 2b,#5080 Emines#Belgique', '{
    "meta": {
        "sizeX": 8,
        "sizeY": 3
    },
    "content": [
        [0, null, 1, null, 2, null, 3, null],
        [0, null, 1, null, 2, null, 3, null],
        [0, null, 1, null, 2, null, 3, null]
    ]
}'),                                                                           --3
(NOW(), 'Le monde de la choucroute', 'Rue de la chouchroute 14,# 1414 CrouteChou#Belgique', '{
    "meta": {
        "sizeX": 5,
        "sizeY": 4
    },
    "content": [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ]
}');                                                                            --1



DROP TABLE IF EXISTS Affiliation CASCADE;

CREATE TABLE Affiliation (
    garden_id BIGINT REFERENCES Garden(id) DEFERRABLE INITIALLY IMMEDIATE,
    user_id VARCHAR REFERENCES Account(email) DEFERRABLE INITIALLY IMMEDIATE,
    role VARCHAR NOT NULL,
    join_date DATE NOT NULL,
    PRIMARY KEY (garden_id, user_id)
);

INSERT INTO Affiliation (garden_id, user_id, role, join_date) VALUES
(1, 'logan.stls@gmail.com', 'affiliate', NOW()),
(2, 'logan.stls@gmail.com', 'admin', NOW()),
(1, 'gesimon8363@gmail.com', 'admin', NOW()),
(3, 'nathantherasse@gmail.com', 'admin', NOW()),             
(3, 'logan.stls@gmail.com', 'affiliate', NOW()),
(4, 'cyrilbaras@gmail.com', 'admin', NOW()); 


DROP TABLE IF EXISTS Area CASCADE;

CREATE TABLE Area (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    garden_id BIGINT REFERENCES Garden(id) DEFERRABLE INITIALLY IMMEDIATE,
    area_index INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR
);


--Zones Potager Bitumine
INSERT INTO Area(garden_id, area_index, name, description) VALUES (2, 0, 'Carotte', 'Carottes d\''Afrique du Sud'); --1
INSERT INTO Area(garden_id, area_index, name) VALUES 
(2, 1, 'Pattates'),                                      --2
(3, 0, 'Potiron'),  
(3, 1, 'Carottes'),  
(3, 2, 'Tomates'),  
(3, 3, 'Courgette'),
(4, 1, 'Choux blanc');


DROP TABLE IF EXISTS Task CASCADE;

CREATE TABLE Task (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    area_id BIGINT REFERENCES Area(id) DEFERRABLE INITIALLY IMMEDIATE,
    title VARCHAR  NOT NULL,
    description VARCHAR,
    start_date TIMESTAMP NOT NULL,
    deadline_date TIMESTAMP NOT NULL,
    validated BOOLEAN DEFAULT FALSE
);

INSERT INTO Task (area_id, title, start_date, deadline_date) VALUES
(1, 'Arosage léger', '2023-11-15 00:00:00', '2023-11-16 00:00:00');