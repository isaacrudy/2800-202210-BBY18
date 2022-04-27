CREATE TABLE user_login (
  ID int NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (ID)
);