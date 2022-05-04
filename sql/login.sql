CREATE TABLE IF NOT EXISTS user(
    id int AUTO_INCREMENT,
    password     VARCHAR(50) NOT NULL,
    firstName    VARCHAR(50) NOT NULL,
    lastName     VARCHAR(50) NOT NULL,
    email        VARCHAR(50) UNIQUE NOT NULL,
    role         VARCHAR(20) NOT NULL DEFAULT "regular",
    PRIMARY KEY(id)
);