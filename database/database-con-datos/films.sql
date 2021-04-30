-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2021 a las 04:27:22
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `films`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Comedias'),
(4, 'Dramáticas'),
(5, 'Terror');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `films`
--

CREATE TABLE `films` (
  `movie_id` int(11) NOT NULL,
  `movie_image` text COLLATE utf8_unicode_ci NOT NULL,
  `movie_title` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `movie_description` text COLLATE utf8_unicode_ci NOT NULL,
  `movie_duration` time NOT NULL,
  `movie_trailer` text COLLATE utf8_unicode_ci NOT NULL,
  `movie_premiere_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `films`
--

INSERT INTO `films` (`movie_id`, `movie_image`, `movie_title`, `movie_description`, `movie_duration`, `movie_trailer`, `movie_premiere_date`) VALUES
(1, 'https://www.covercaratulas.com/ode/mini/carteles-4361.jpg', 'Scary Movie', 'Una bella estudiante muere asesinada. Un grupo de desorientados adolescentes descubre que entre ellos hay un asesino. La heroína', '01:20:00', 'https://www.youtube.com/watch?v=3iy0pE1FBkc', '2000-04-29'),
(2, 'https://www.covercaratulas.com/ode/mini_mini/carteles-4362.jpg', 'Scary Movie 2\r\n', 'Scary Movie 2 es una película de terror de comedia estadounidense de 2001. Es la secuela de Scary Movie y la segunda película de la serie de películas de Scary Movie. ', '01:23:00', 'https://www.youtube.com/watch?v=NdnacU5sbcE', '2001-04-29'),
(4, 'https://images-na.ssl-images-amazon.com/images/I/518HX-6NhBL._SY445_.jpg', 'Scary movie 3', 'Tercera entrega de la famosa franquicia que parodia, en este caso, películas como “The Ring”, “Signs”, “Matrix Reloaded”, “8 Mile”, “', '01:39:00', 'https://www.youtube.com/watch?v=ficqfF525vk', '2003-04-29'),
(5, 'https://www.locopelis.com/files/uploads/825.jpg', 'Scary movie 4', 'Todo comienza cuando la periodista Cindy Campbell se propone encontrar una historia que destaque en medio de toda la basura televisiva. No tarda mucho en descubrir que la tierra se ve amenazada por una serie de hechos terroríficos, entre los que se incluyen una invasión alienígena, cintas de video asesinas, señales extrañas en los campos de cultivo anormales, profecías de El Elegido, niños con miradas espeluznantes, ambiciosos raperos blancos e incluso llegará a vivir un altercado con Michael Jackson. Cindy tendrá que enfrentarse a conspiraciones de proporciones gigantescas y a un ejército de seres estrambóticos que la persiguen. Todo con el fin de evitar que el mal se apoderé del mundo otra vez.', '01:11:08', 'https://www.youtube.com/watch?v=Oxdbmzwisb8', '2021-04-29'),
(6, 'https://seriesmovil.io/uploads/thumbs/827f08ecd-1.jpg', 'Rocky 4', 'Rocky Balboa, el popular campeón de boxeo de los pesos pesados, se enfrenta a un nuevo desafío en su carrera: un boxeador ruso llamado Drago. El primer compromiso de Drago en América es con Apollo Creed, amigo de Rocky y su antiguo rival, que quiere probarse a sí mismo, una vez más. Cuando Apollo muere en la pelea, Rocky se ve obligado moralmente a enfrentarse al ruso.', '01:13:59', 'https://www.youtube.com/watch?v=mIE5HYkzvV0', '2005-04-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `films_categories`
--

CREATE TABLE `films_categories` (
  `pk_fk_movie_id` int(11) NOT NULL,
  `pk_fk_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `films_categories`
--

INSERT INTO `films_categories` (`pk_fk_movie_id`, `pk_fk_category_id`) VALUES
(1, 1),
(1, 5),
(2, 1),
(2, 5),
(4, 1),
(4, 4),
(5, 1),
(5, 5),
(6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `films_users`
--

CREATE TABLE `films_users` (
  `pk_fk_movie_id` int(11) NOT NULL,
  `pk_fk_user_id` int(11) NOT NULL,
  `film_status` tinyint(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Administrator'),
(2, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fk_role_id` int(11) NOT NULL,
  `first_name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `second_name` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `surname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `second_surname` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `password_user` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `fk_role_id`, `first_name`, `second_name`, `surname`, `second_surname`, `email`, `password_user`) VALUES
(1, 2, 'Eric', '', 'Solarte', NULL, 'erick200_@hotmail.com', 'MTIzY3Nh'),
(2, 1, 'admin', NULL, 'admin', NULL, 'admin@hotmail.com', 'MTIzY3Nh');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indices de la tabla `films_categories`
--
ALTER TABLE `films_categories`
  ADD PRIMARY KEY (`pk_fk_movie_id`,`pk_fk_category_id`),
  ADD KEY `pk_fk_category_id` (`pk_fk_category_id`);

--
-- Indices de la tabla `films_users`
--
ALTER TABLE `films_users`
  ADD PRIMARY KEY (`pk_fk_movie_id`,`pk_fk_user_id`),
  ADD KEY `pk_fk_users_id` (`pk_fk_user_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_roles_id` (`fk_role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `films`
--
ALTER TABLE `films`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `films_categories`
--
ALTER TABLE `films_categories`
  ADD CONSTRAINT `pk_fk_category_id` FOREIGN KEY (`pk_fk_category_id`) REFERENCES `categories` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_fk_movie_id` FOREIGN KEY (`pk_fk_movie_id`) REFERENCES `films` (`movie_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `films_users`
--
ALTER TABLE `films_users`
  ADD CONSTRAINT `pk_fk_films_id` FOREIGN KEY (`pk_fk_movie_id`) REFERENCES `films` (`movie_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_fk_users_id` FOREIGN KEY (`pk_fk_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_roles_id` FOREIGN KEY (`fk_role_id`) REFERENCES `roles` (`role_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
