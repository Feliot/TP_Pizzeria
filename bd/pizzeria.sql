-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2016 a las 06:26:46
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pizzeria`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarProducto`(IN `pid` INT)
    NO SQL
    DETERMINISTIC
delete from producto	WHERE id=pid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarProducto`(IN `pmarca` VARCHAR(50), IN `pprecio` FLOAT(15), IN `pstock` INT(11), IN `ptipo` VARCHAR(50), IN `pfoto` VARCHAR(100))
    NO SQL
    DETERMINISTIC
INSERT into producto (marca,precio,stock,tipo,foto)
values
(pmarca,pprecio,pstock,ptipo,pfoto)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarUsuario`(IN `pnombre` VARCHAR(50), IN `pclave` VARCHAR(50), IN `pcorreo` VARCHAR(50), IN `ptipo` VARCHAR(50))
    NO SQL
    DETERMINISTIC
INSERT into usuario (nombre,clave,correo,tipo)
values
(pnombre,pclave,pcorreo,ptipo)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarProducto`(IN `pid` INT(11), IN `pmarca` VARCHAR(50), IN `pprecio` FLOAT(18), IN `pstock` INT(18), IN `ptipo` VARCHAR(50), IN `pfoto` VARCHAR(100))
    NO SQL
    DETERMINISTIC
update producto 
				set marca=pmarca,
                precio=pprecio,
				strock=pstock,
                tipo= ptipo,
				foto=pfoto
				WHERE id=pid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerTodosLosProductos`()
    NO SQL
select * from producto$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerUnProducto`(IN `pid` INT(18))
    NO SQL
    DETERMINISTIC
select * from producto where id =pid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerUnUsuario`(IN `pid` INT(18))
    NO SQL
    DETERMINISTIC
select * from usuario where id = pid$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `precio` decimal(10,0) NOT NULL DEFAULT '0',
  `stock` int(11) NOT NULL,
  `foto` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `tipo`, `marca`, `precio`, `stock`, `foto`) VALUES
(1, 'salsa de tomate', 'pomarola', '3', 5, ''),
(2, 'salsa de tomate', 'marolio', '3', 5, ''),
(4, 'salsa de tomat', 'pomarola', '0', 1, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `Unico` (`tipo`,`marca`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
