CREATE DATABASE language_learner;
USE language_learner;

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    user VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    lang VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE wordBank (
    id INT PRIMARY KEY,
    knownWords JSON,
    unknownWords JSON,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE decks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deckName VARCHAR(255) NOT NULL,
    deckContents JSON,
    report TEXT,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO accounts (first_name, last_name, username, pass_word, contents)
VALUES
('Sharyar', 'Ali', 'sherryzain', 'rishith', 'Sherry loves Rishith'),
('Zain', 'Chaudhry', 'zainbeast', 'eesa', 'Zain Eesa forever');


INSERT INTO wordBank (id, knownWords, unknownWords, created)
VALUES (
    1,
    JSON_ARRAY('hola', 'adiós', 'gracias', 'por favor', 'sí', 'no', 'buenos días', 'buenas noches', 'perdón', 'disculpe', 'salud', 'bien', 'mal', 'amigo', 'amiga', 'familia', 'comida', 'agua', 'casa', 'escuela'),
    JSON_ARRAY('trabajo', 'dinero', 'tiempo', 'amor', 'felicidad', 'tristeza', 'miedo', 'esperanza', 'paz', 'guerra'),
    NOW()
);