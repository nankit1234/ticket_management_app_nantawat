-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 11, 2024 at 08:13 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `contact_info` text,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `contact_info`, `status`, `created_at`, `updated_at`) VALUES
(6, 'Issue with login', 'User cannot login to the system', 'user1@example.com', 'accepted', '2024-11-08 14:34:49', '2024-11-11 07:15:01'),
(7, 'Password reset request', 'User requested a password reset link', 'user2@example.com', 'resolved', '2024-11-08 14:34:49', '2024-11-11 07:30:09'),
(8, 'Bug in payment system', 'Payment gateway is not processing payments correctly', 'user3@example.com', 'accepted', '2024-11-08 14:34:49', '2024-11-11 07:30:16'),
(9, 'Server downtime', 'The server is down and users are unable to access the website', 'user4@example.com', 'accepted', '2024-11-08 14:34:49', '2024-11-11 07:19:55'),
(10, 'Feature request', 'User requested a new feature for report generation', 'user5@example.com', 'resolved', '2024-11-08 14:34:49', '2024-11-11 07:19:54');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
