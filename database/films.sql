DROP DATABASE IF EXISTS films;
CREATE DATABASE films;
USE films;
/*
 ======================================
 ROLE
 ======================================
 */
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(40) NOT NULL,
    PRIMARY KEY (role_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
/*
 ======================================
 CATEGORIES
 ======================================
 */
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    category_id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (category_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
/*
 ======================================
 USERS
 ======================================
 */
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    fk_role_id INT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    second_name VARCHAR(40),
    surname VARCHAR(40) NOT NULL,
    second_surname VARCHAR(40),
    email VARCHAR(120) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
/*
 ======================================
 FILMS
 ======================================
 */
DROP TABLE IF EXISTS films;
CREATE TABLE films (
    movie_id INT NOT NULL AUTO_INCREMENT,
    fk_category_id INT NOT NULL,
    movie_image TEXT NOT NULL,
    movie_title VARCHAR(80) NOT NULL,
    movie_description TEXT NOT NULL,
    movie_duration TIME NOT NULL,
    movie_trailer TEXT NOT NULL,
    movie_premiere_date DATE NOT NULL,
    PRIMARY KEY (movie_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
/*
 ======================================
 FILMS_USERS
 ======================================
 */
DROP TABLE IF EXISTS films_users;
CREATE TABLE films_users (
    pk_fk_movie_id INT NOT NULL,
    pk_fk_user_id INT NOT NULL,
    film_status TINYINT(3),
    PRIMARY KEY (pk_fk_movie_id, pk_fk_user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
/*
 ======================================
 FILMS_CATEGORIES
 ======================================
 */
DROP TABLE IF EXISTS films_categories;
CREATE TABLE films_categories (
    pk_fk_movie_id INT NOT NULL,
    pk_fk_category_id INT NOT NULL,
    PRIMARY KEY (pk_fk_movie_id, pk_fk_category_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
ALTER TABLE users
ADD CONSTRAINT fk_roles_id FOREIGN KEY(fk_role_id) REFERENCES roles(role_id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE films_categories
ADD CONSTRAINT pk_fk_movie_id FOREIGN KEY(pk_fk_movie_id) REFERENCES films(movie_id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE films_categories
ADD CONSTRAINT pk_fk_category_id FOREIGN KEY(pk_fk_category_id) REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE films_users
ADD CONSTRAINT pk_fk_films_id FOREIGN KEY(pk_fk_movie_id) REFERENCES films(movie_id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE films_users
ADD CONSTRAINT pk_fk_users_id FOREIGN KEY(pk_fk_user_id) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE;
INSERT INTO roles
VALUES (NULL, 'Administrator'),
    (NULL, 'Cliente');