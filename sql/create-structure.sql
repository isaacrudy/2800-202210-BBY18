CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mydb`;

-- DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id 				int AUTO_INCREMENT,
    password    	VARCHAR(20) NOT NULL,
    firstName 		VARCHAR(50) NOT NULL,
    lastName    	VARCHAR(50) NOT NULL,
    email       	VARCHAR(50) UNIQUE NOT NULL,
    profilePhoto    VARCHAR(50) NOT NULL DEFAULT "default_photo.png",
    role        	VARCHAR(7) NOT NULL DEFAULT "regular",
    PRIMARY KEY(id)
);

USE `mydb`;
CREATE TABLE IF NOT EXISTS charities (
    id 				int AUTO_INCREMENT,
    name    	    VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

USE `mydb`;
CREATE TABLE IF NOT EXISTS timeline (
    id              int AUTO_INCREMENT,
    user_ID         int NOT NULL,
    image_ID        int NOT NULL,
    time            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_Content    VARCHAR(50),
    PRIMARY KEY(id),
    FOREIGN KEY(user_ID) REFERENCES users(id) ON UPDATE CASCADE
)

USE `mydb`;
CREATE TABLE IF NOT EXISTS charity_donations (
    id              int AUTO_INCREMENT,
    charity_ID      int NOT NULL,
    user_ID         int NOT NULL,
    total           int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_ID) REFERENCES users(id) ON UPDATE CASCADE,
    FOREIGN KEY(Charity_ID) REFERENCES charities(id) ON UPDATE CASCADE
)