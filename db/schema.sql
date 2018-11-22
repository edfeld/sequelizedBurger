/* Schema */

-- DROP DATABASE IF EXISTS burgers_db;
-- CREATE DATABASE IF NOT EXISTS burgers_db;
USE tkl5taw79k9f4o91;

CREATE TABLE if not exists burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(50) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);