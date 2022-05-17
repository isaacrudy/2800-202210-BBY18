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
CREATE TABLE IF NOT EXISTS charities (
    id 				int AUTO_INCREMENT,
    name    	    VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

USE `mydb`;
CREATE TABLE IF NOT EXISTS timelines (
    id 				int AUTO_INCREMENT,
    user_id         int NOT NULL,
    timeline_text    	    VARCHAR(200) NOT NULL,
    post_date_time            varchar(30) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);