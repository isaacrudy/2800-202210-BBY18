CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mydb`;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    id                 int AUTO_INCREMENT,
    password        VARCHAR(20) NOT NULL,
    firstName       VARCHAR(50) NOT NULL,
    lastName        VARCHAR(50) NOT NULL,
    email           VARCHAR(50) UNIQUE NOT NULL,
    profilePhoto    VARCHAR(50)    NOT NULL DEFAULT "some/filePath/default.png",
    role            VARCHAR(7) NOT NULL DEFAULT "regular",
    PRIMARY KEY(id)
);

INSERT INTO users
(password, firstName, lastName, email)
VALUES
    ("1234", "Dennis", "Relos", "drelos@gmail.com"),
    ("asdf", "Calvin", "Yu", "cyu@gmail.com"),
    ("12qw", "Isaac", "Rudy", "irudy@gmail.com"),
    ("zx12", "Amadeus", "Min", "amin@gmail.com");
    
INSERT INTO users
    (password, firstName, lastName, email, role)
VALUES
    ("admin", "Omar", "Navarro", "onavarro@fundcart.com", "admin"),
    ("admin1234", "Buzz", "Lightyear", "blightyear@fundcart.com", "admin");