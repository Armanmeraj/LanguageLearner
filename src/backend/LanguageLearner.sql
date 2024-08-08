CREATE DATABASE language_learner;
USE language_learner;

CREATE TABLE accounts (
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    pass_word VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO accounts (first_name, last_name, username, pass_word, contents)
VALUES
('Sharyar', 'Ali', 'sherryzain', 'rishith', 'Sherry loves Rishith'),
('Zain', 'Chaudhry', 'zainbeast', 'eesa', 'Zain Eesa forever');