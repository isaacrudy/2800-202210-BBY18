CREATE DATABASE IF NOT EXISTS `COMP2800` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `COMP2800`;

CREATE TABLE IF NOT EXISTS BBY_18_users (
    id 				int AUTO_INCREMENT,
    password    	VARCHAR(20) NOT NULL,
    firstName 		VARCHAR(50) NOT NULL,
    lastName    	VARCHAR(50) NOT NULL,
    email       	VARCHAR(50) UNIQUE NOT NULL,
    profilePhoto    VARCHAR(50) NOT NULL DEFAULT "default_photo.png",
    role        	VARCHAR(7) NOT NULL DEFAULT "regular",
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS BBY_18_charities (
    id 				int AUTO_INCREMENT,
    charityName    	VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS BBY_18_charity_donations (
    id              int AUTO_INCREMENT,
    charity_ID      int NOT NULL,
    user_ID         int NOT NULL,
    total           DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_ID) REFERENCES BBY_18_users(id) ON UPDATE CASCADE,
    FOREIGN KEY(Charity_ID) REFERENCES BBY_18_charities(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BBY_18_timeline_image (
    id              int AUTO_INCREMENT,
    timeline_photo  VARCHAR(50) NOT NULL DEFAULT "default_photo.png",
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS BBY_18_timelines (
    id 				        int AUTO_INCREMENT,
    user_id                 int NOT NULL,
    timeline_image_id       int NOT NULL,
    timeline_text    	    VARCHAR(200) NOT NULL,
    post_date_time          varchar(30) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES BBY_18_users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (timeline_image_id) REFERENCES BBY_18_timeline_image(id) ON UPDATE CASCADE ON DELETE CASCADE
);