USE a5krpd2mizr6buac;

CREATE TABLE burgers(
    id INT(10) NOT NULL AUTO_INCREMENT
    , burger_name VARCHAR(100) NOT NULL
    , devoured BOOLEAN NOT NULL DEFAULT 0
    , PRIMARY KEY (id)
);

SELECT * FROM burgers