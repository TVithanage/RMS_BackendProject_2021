-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Sep 10, 2021 at 07:55 AM
-- Server version: 8.0.21
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruitment_management`
--
CREATE DATABASE IF NOT EXISTS `recruitment_management` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `recruitment_management`;

-- --------------------------------------------------------

--
-- Table structure for table `candidate_profile`
--

DROP TABLE IF EXISTS `candidate_profile`;
CREATE TABLE `candidate_profile` (
  `id` int NOT NULL,
  `photo_filename` varchar(100) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `mobile` char(10) NOT NULL,
  `land` char(10) NOT NULL,
  `address` varchar(300) NOT NULL,
  `nic` varchar(12) NOT NULL,
  `nic_filename` varchar(100) NOT NULL,
  `modified_date` date NOT NULL,
  `user_id` int NOT NULL,
  `review_user_id` int DEFAULT NULL,
  `review_score` int DEFAULT '0',
  `review_date` date DEFAULT NULL,
  `review_remarks` varchar(250) DEFAULT NULL,
  `candidate_profile_review_status_id` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidate_profile`
--

INSERT INTO `candidate_profile` (`id`, `photo_filename`, `short_name`, `full_name`, `mobile`, `land`, `address`, `nic`, `nic_filename`, `modified_date`, `user_id`, `review_user_id`, `review_score`, `review_date`, `review_remarks`, `candidate_profile_review_status_id`) VALUES
(3, '61b6d54b5600c0c96a2409fb1fec71c7.jpg', 'D.K. Rathnayake', 'Dasun Kasange Rathnayake', '0713334321', '0362233214', '80/1, Colombo Rd., Rathnayake.', '980512436V', 'e1fc637af351945ddbe1731d2c29e8eb.jpg', '2021-09-03', 1, NULL, 20, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `candidate_profile_review_status`
--

DROP TABLE IF EXISTS `candidate_profile_review_status`;
CREATE TABLE `candidate_profile_review_status` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidate_profile_review_status`
--

INSERT INTO `candidate_profile_review_status` (`id`, `name`) VALUES
(1, 'Pending'),
(2, 'Reviewed');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_qualification`
--

DROP TABLE IF EXISTS `candidate_qualification`;
CREATE TABLE `candidate_qualification` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `candidate_profile_id` int NOT NULL,
  `qualification_type_id` int NOT NULL,
  `score` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidate_qualification`
--

INSERT INTO `candidate_qualification` (`id`, `name`, `filename`, `candidate_profile_id`, `qualification_type_id`, `score`) VALUES
(1, 'edu1', '178d45cef4663ac20dbadd8704cb2277.jpg', 3, 1, 10),
(2, 'edu2', 'e1fc637af351945ddbe1731d2c29e8eb.jpg', 3, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `description`) VALUES
(1, 'HR', NULL),
(2, 'IT', NULL),
(3, 'Sample', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_category`
--

DROP TABLE IF EXISTS `job_category`;
CREATE TABLE `job_category` (
  `id` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_category`
--

INSERT INTO `job_category` (`id`, `name`, `description`) VALUES
(1, 'Sample Category 1', NULL),
(2, 'Sample Category 2', NULL),
(3, 'Sample Category 3', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_vacancy`
--

DROP TABLE IF EXISTS `job_vacancy`;
CREATE TABLE `job_vacancy` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `added_date` date NOT NULL,
  `user_id` int NOT NULL,
  `department_id` int NOT NULL,
  `job_category_id` int NOT NULL,
  `job_vacancy_status_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_vacancy`
--

INSERT INTO `job_vacancy` (`id`, `title`, `position`, `description`, `location`, `added_date`, `user_id`, `department_id`, `job_category_id`, `job_vacancy_status_id`) VALUES
(1, 'testtest', 'testtest', 'gsdfgdggdfgfdfdd', 'fsdggfdgdg', '2021-08-29', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `job_vacancy_status`
--

DROP TABLE IF EXISTS `job_vacancy_status`;
CREATE TABLE `job_vacancy_status` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_vacancy_status`
--

INSERT INTO `job_vacancy_status` (`id`, `name`) VALUES
(1, 'Open'),
(2, 'Filled');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `name`) VALUES
(4, 'CANDIDATE_PROFILE'),
(8, 'CANDIDATE_PROFILE_REVIEW'),
(6, 'DEPARTMENT'),
(5, 'JOB_CATEGORY'),
(7, 'JOB_VACANCY'),
(2, 'PRIVILEGE'),
(3, 'ROLE'),
(1, 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
CREATE TABLE `privilege` (
  `id` int NOT NULL,
  `permission` char(4) DEFAULT NULL,
  `role_id` int NOT NULL,
  `module_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `privilege`
--

INSERT INTO `privilege` (`id`, `permission`, `role_id`, `module_id`) VALUES
(26, '1111', 1, 1),
(27, '1111', 1, 2),
(28, '1111', 1, 3),
(29, '1111', 1, 4),
(30, '1111', 1, 5),
(31, '1111', 1, 6),
(32, '1111', 1, 7),
(33, '1111', 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `qualification_type`
--

DROP TABLE IF EXISTS `qualification_type`;
CREATE TABLE `qualification_type` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `qualification_type`
--

INSERT INTO `qualification_type` (`id`, `name`) VALUES
(1, 'Educational'),
(2, 'Professional'),
(3, 'Experience');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `description`) VALUES
(1, 'Admin', NULL),
(2, 'Interviewer', NULL),
(3, 'Candidate', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(600) DEFAULT NULL,
  `photo_filename` varchar(100) DEFAULT 'avatar.png',
  `email` varchar(45) NOT NULL DEFAULT 'not set',
  `mobile` char(10) NOT NULL DEFAULT 'not set',
  `added_date` date NOT NULL,
  `user_status_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `photo_filename`, `email`, `mobile`, `added_date`, `user_status_id`) VALUES
(1, 'admin', '1bb588c7f40a8eee0608270572102599dd5f8e55fc6982a75c8da167f3064fb841ff0ebcbb91cf01f38ab479a8877b5e3184ef118c6c1607ead4006180fa2682', 'avatar.png', 'admin@admin.com', '0711111111', '2010-01-01', 1),
(2, 'nirmal', 'b4d0f6240e39e4d452a5cd43dad70c9c49efc738c5b96f86e48acd036b9b2b6ba78566062ef19599e38008ab1be1ac3bd1c176a5fe807b8aa573be3d2b925118', 'avatar.png', 'not set', 'not set', '2021-08-22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int NOT NULL,
  `role_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role_id`, `user_id`) VALUES
(1, 1, 1),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_status`
--

DROP TABLE IF EXISTS `user_status`;
CREATE TABLE `user_status` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_status`
--

INSERT INTO `user_status` (`id`, `name`) VALUES
(1, 'Active'),
(2, 'Suspended'),
(3, 'Deleted');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate_profile`
--
ALTER TABLE `candidate_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_candidate_profile_user1_idx` (`user_id`),
  ADD KEY `fk_candidate_profile_user2_idx` (`review_user_id`),
  ADD KEY `fk_candidate_profile_candidate_profile_review_status1_idx` (`candidate_profile_review_status_id`);

--
-- Indexes for table `candidate_profile_review_status`
--
ALTER TABLE `candidate_profile_review_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate_qualification`
--
ALTER TABLE `candidate_qualification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_candidate_qualification_candidate_profile1_idx` (`candidate_profile_id`),
  ADD KEY `fk_qualification_qualification_type1_idx` (`qualification_type_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_category`
--
ALTER TABLE `job_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_vacancy`
--
ALTER TABLE `job_vacancy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_vacancy_user1_idx` (`user_id`),
  ADD KEY `fk_job_vacancy_department1_idx` (`department_id`),
  ADD KEY `fk_job_vacancy_job_category1_idx` (`job_category_id`),
  ADD KEY `fk_job_vacancy_job_vacancy_status1_idx` (`job_vacancy_status_id`);

--
-- Indexes for table `job_vacancy_status`
--
ALTER TABLE `job_vacancy_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `privilege`
--
ALTER TABLE `privilege`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_privilege_role1_idx` (`role_id`),
  ADD KEY `fk_privilege_module1_idx` (`module_id`);

--
-- Indexes for table `qualification_type`
--
ALTER TABLE `qualification_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `fk_user_userstatus1_idx` (`user_status_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_role_has_user_user1_idx` (`user_id`),
  ADD KEY `fk_role_has_user_role1_idx` (`role_id`);

--
-- Indexes for table `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate_profile`
--
ALTER TABLE `candidate_profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `candidate_profile_review_status`
--
ALTER TABLE `candidate_profile_review_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `candidate_qualification`
--
ALTER TABLE `candidate_qualification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_category`
--
ALTER TABLE `job_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_vacancy`
--
ALTER TABLE `job_vacancy`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_vacancy_status`
--
ALTER TABLE `job_vacancy_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `privilege`
--
ALTER TABLE `privilege`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `qualification_type`
--
ALTER TABLE `qualification_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_status`
--
ALTER TABLE `user_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidate_profile`
--
ALTER TABLE `candidate_profile`
  ADD CONSTRAINT `fk_candidate_profile_candidate_profile_review_status1` FOREIGN KEY (`candidate_profile_review_status_id`) REFERENCES `candidate_profile_review_status` (`id`),
  ADD CONSTRAINT `fk_candidate_profile_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_candidate_profile_user2` FOREIGN KEY (`review_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `candidate_qualification`
--
ALTER TABLE `candidate_qualification`
  ADD CONSTRAINT `fk_candidate_qualification_candidate_profile1` FOREIGN KEY (`candidate_profile_id`) REFERENCES `candidate_profile` (`id`),
  ADD CONSTRAINT `fk_qualification_qualification_type1` FOREIGN KEY (`qualification_type_id`) REFERENCES `qualification_type` (`id`);

--
-- Constraints for table `job_vacancy`
--
ALTER TABLE `job_vacancy`
  ADD CONSTRAINT `fk_job_vacancy_department1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `fk_job_vacancy_job_category1` FOREIGN KEY (`job_category_id`) REFERENCES `job_category` (`id`),
  ADD CONSTRAINT `fk_job_vacancy_job_vacancy_status1` FOREIGN KEY (`job_vacancy_status_id`) REFERENCES `job_vacancy_status` (`id`),
  ADD CONSTRAINT `fk_job_vacancy_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `privilege`
--
ALTER TABLE `privilege`
  ADD CONSTRAINT `fk_privilege_module1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  ADD CONSTRAINT `fk_privilege_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_userstatus1` FOREIGN KEY (`user_status_id`) REFERENCES `user_status` (`id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `fk_role_has_user_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `fk_role_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
