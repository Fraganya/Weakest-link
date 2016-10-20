--
-- File generated with SQLiteStudio v3.1.0 on Thu Oct 20 14:18:57 2016
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: modifications
DROP TABLE IF EXISTS modifications;

CREATE TABLE modifications (
    mod_id  INTEGER NOT NULL
                    PRIMARY KEY,
    mod     TEXT    NOT NULL,
    real    TEXT    NOT NULL,
    changes BLOB    NOT NULL
);

INSERT INTO modifications (
                              mod_id,
                              mod,
                              real,
                              changes
                          )
                          VALUES (
                              1,
                              'round time',
                              'the original round time is 3 minutes',
                              'The game round is reduced to only 90 seconds'
                          );


-- Table: ideas
DROP TABLE IF EXISTS ideas;

CREATE TABLE ideas (
    id    INTEGER  PRIMARY KEY ASC AUTOINCREMENT
                   NOT NULL,
    about TEXT     NOT NULL,
    added DATETIME NOT NULL,
    [by]  INTEGER  NOT NULL
                   REFERENCES contributors (id) 
);


-- Table: top_contributors
DROP TABLE IF EXISTS top_contributors;

CREATE TABLE top_contributors (
    id      INTEGER PRIMARY KEY ASC AUTOINCREMENT
                    NOT NULL,
    c_fname STRING  NOT NULL,
    c_sname STRING  NOT NULL,
    count   INTEGER NOT NULL
                    DEFAULT (0) 
);

INSERT INTO top_contributors (
                                 id,
                                 c_fname,
                                 c_sname,
                                 count
                             )
                             VALUES (
                                 0,
                                 'Francis',
                                 'Ganya',
                                 1000
                             );


-- Table: guides
DROP TABLE IF EXISTS guides;

CREATE TABLE guides (
    guide_id   INTEGER PRIMARY KEY
                       NOT NULL,
    guide_name TEXT    NOT NULL,
    content    TEXT    NOT NULL
);


-- Table: contributors
DROP TABLE IF EXISTS contributors;

CREATE TABLE contributors (
    id      INTEGER NOT NULL
                    PRIMARY KEY AUTOINCREMENT,
    c_fname TEXT    NOT NULL,
    c_sname TEXT    NOT NULL
);


-- Table: about
DROP TABLE IF EXISTS about;

CREATE TABLE about (
    gamename  VARCHAR (20) NOT NULL
                           PRIMARY KEY,
    info      TEXT (1000)  NOT NULL,
    version   STRING (10)  NOT NULL,
    developer TEXT         NOT NULL,
    contact   STRING (20),
    email     STRING,
    overview  STRING       NOT NULL,
    website   STRING
);

INSERT INTO about (
                      gamename,
                      info,
                      version,
                      developer,
                      contact,
                      email,
                      overview,
                      website
                  )
                  VALUES (
                      'Weakest-Link',
                      'The weakest link is a real world  television game show.In this game a group of contestants
    (players) work together to try and win as much money as possible by answering a series of questions.
    The number of contestants range from 5-9 (varies among versions).If a person answers the question correctly, 
    the money chain moves to the next stage otherwise if wrong the money chain restarts.A contestants has the option of 
    banking the money before answering the question but the chain restarts.If 9 questions are answered correctly and no one banks 
    the money is automatically added to the jackpot and the round stops.The time allowed for each round decreases as the round increases.
    If the contestant takes  too long to answer, it is considered to be incorrect and the answer is given.
    At the end of each round all contestants are allowed to vote for who they think is the weakest link (The person dragging them down) in 
    then just ended round.The one with the most votes is eliminated and if there is a tie the strongest link (The person who had the most correct answers or
    banked the most money) gets to chose who leaves among the ties.The strongest link gets to start in the next round and if was voted of
    the second strongest link gets to go first.In the final round an allowance is made to generate more money and there is no voting.
    This is called the triple stake round which usually spans 90 seconds.After that comes the head-to-head contest in which each of the two remaining 
    contestants battle it out with 5 questions asked to each contestant.if there is a tie the game continues to a sudden death.The winner gets all the money  whilst the loser goes home with nothing.Hope this information was useful. ',
                      '2.0.0',
                      'Fraganya',
                      265882370345,
                      'Ganyaf@gmail.com',
                      'A multiplayer quiz game based on the real world game show "The weakest-link"',
                      'Fraganya.me.ht'
                  );


-- Table: contributed_questions
DROP TABLE IF EXISTS contributed_questions;

CREATE TABLE contributed_questions (
    q_id     INTEGER PRIMARY KEY
                     NOT NULL,
    question TEXT    NOT NULL,
    answer   TEXT    NOT NULL,
    [by]     INT     REFERENCES contributors (id) 
);


-- Table: acknowledgements
DROP TABLE IF EXISTS acknowledgements;

CREATE TABLE acknowledgements (
    id      INTEGER NOT NULL
                    PRIMARY KEY AUTOINCREMENT,
    project STRING  NOT NULL,
    website STRING
);

INSERT INTO acknowledgements (
                                 id,
                                 project,
                                 website
                             )
                             VALUES (
                                 1,
                                 'Bootstrap',
                                 'getbootstrap.com'
                             );

INSERT INTO acknowledgements (
                                 id,
                                 project,
                                 website
                             )
                             VALUES (
                                 2,
                                 'ReactJS',
                                 'github/facebook/ReactJs.io'
                             );

INSERT INTO acknowledgements (
                                 id,
                                 project,
                                 website
                             )
                             VALUES (
                                 3,
                                 'Jqeury',
                                 'Jquery.com'
                             );

INSERT INTO acknowledgements (
                                 id,
                                 project,
                                 website
                             )
                             VALUES (
                                 4,
                                 'Font-awesome',
                                 'www.font-awesome.com'
                             );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
