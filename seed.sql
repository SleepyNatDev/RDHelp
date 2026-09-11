CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

INSERT INTO users (name, email, password) VALUES
    ('Nat', 'sleepynat@proton.me', '')
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    image VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS recipesXtags (
    recipeid INTEGER,
    tagid INTEGER,
    PRIMARY KEY (recipeid, tagid)
);

INSERT INTO recipes (name, image, description) VALUES
    ('test1', '', 'test1'),
    ('test2', '', 'test2');

INSERT INTO tags (name) VALUES
    ('tag1'),
    ('tag2'),
    ('healthy'),
    ('test');

INSERT INTO recipesXtags (recipeid, tagid) VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4);
