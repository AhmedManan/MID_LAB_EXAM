-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2020 at 02:27 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chotushkon`
--

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `id` int(10) NOT NULL,
  `sender` int(10) NOT NULL,
  `receiver` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(10) NOT NULL,
  `posterid` varchar(10) NOT NULL,
  `post` int(10) NOT NULL,
  `description` varchar(500) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `id` int(10) NOT NULL,
  `personid` int(10) NOT NULL,
  `friendid` int(10) NOT NULL,
  `follow` tinyint(1) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `like`
--

CREATE TABLE `like` (
  `id` int(10) NOT NULL,
  `posterid` varchar(10) NOT NULL,
  `postid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login_cred`
--

CREATE TABLE `login_cred` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `type` varchar(6) NOT NULL,
  `strike` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_cred`
--

INSERT INTO `login_cred` (`id`, `pid`, `username`, `email`, `password`, `type`, `strike`) VALUES
(1, 1, 'mnn', 'ahmed.mnn@outlook.com', '123', 'admin', 0),
(2, 2, 'messi', 'messi@gmail.com', '12345', 'user', 2),
(3, 3, 'jolie', 'angelina@gmail.com', '321', 'member', 2),
(4, 4, 'cr7', 'cr7@gmail.com', '777', 'member', 2),
(6, 6, 'rihanna', 'rihanna@gmail.com', '1234', 'member', 0);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(10) NOT NULL,
  `senderid` int(10) NOT NULL,
  `reciveid` int(10) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `seen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(10) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `seen` tinyint(1) NOT NULL,
  `receiverid` varchar(10) NOT NULL,
  `senderid` varchar(10) NOT NULL,
  `description` varchar(500) NOT NULL,
  `link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `pageid` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(10) NOT NULL,
  `displayimg` varchar(100) NOT NULL,
  `backgroundimg` varchar(100) NOT NULL,
  `creationdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pagefollower`
--

CREATE TABLE `pagefollower` (
  `id` int(10) NOT NULL,
  `pageid` int(10) NOT NULL,
  `personid` int(10) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `page_admin`
--

CREATE TABLE `page_admin` (
  `id` int(10) NOT NULL,
  `pageid` int(10) NOT NULL,
  `personid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `page_editor`
--

CREATE TABLE `page_editor` (
  `id` int(10) NOT NULL,
  `pageid` int(10) NOT NULL,
  `personid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personal_info`
--

CREATE TABLE `personal_info` (
  `id` int(10) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(10) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `dob` date NOT NULL,
  `school` text DEFAULT NULL,
  `college` text DEFAULT NULL,
  `university` text DEFAULT NULL,
  `displayimg` varchar(100) DEFAULT NULL,
  `backgroundimg` varchar(100) DEFAULT NULL,
  `joiningdate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personal_info`
--

INSERT INTO `personal_info` (`id`, `fname`, `lname`, `email`, `username`, `phone`, `dob`, `school`, `college`, `university`, `displayimg`, `backgroundimg`, `joiningdate`) VALUES
(1, 'Manan', 'Ahmed', 'ahmed.mnn@outlook.com', 'mnn', '01748868061', '2020-08-26', 'B. M. Academy', 'Afsar Ali College', 'AIUB', 'user1.jpg', 'cover1.jpg', '0000-00-00'),
(2, 'Lionel', 'Messi', 'messi@gmail.com', 'messi', '01334656498', '2020-07-26', 'Las Heras', 'Las Heras', 'I never went to university', 'user2.jpg', 'cover2.jpg', '2020-05-18'),
(3, 'Anjelina', 'Jolie', 'angelina@gmail.com', 'jolie', '01746676061', '1981-06-30', 'Lee Strasberg Theatre Institute', 'Lee Strasberg Theatre Institute', 'New York University', 'user3.jpg', 'cover3.jpg', '2010-03-11'),
(4, 'Cristiano', 'Ronaldo', 'cr7@gmail.com', 'cr7', '01305656657', '2085-02-05', 'school in Madeira', 'I never went to college', 'I never went to university ', 'user4.jpg', 'cover4.jpg', '2019-04-24'),
(6, 'Robyn', 'Rihanna', 'rihanna@gmail.com', 'rihanna', '01305643498', '2088-02-20', 'Combermere School', NULL, 'Harvard University ', 'user6.jpg', 'cover6.jpg', '2010-02-11');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(10) NOT NULL,
  `posterid` varchar(10) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `media` varchar(500) DEFAULT NULL,
  `privacy` varchar(7) NOT NULL,
  `time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `posterid`, `description`, `media`, `privacy`, `time`) VALUES
(1, '4', 'goaaaaaal......................', 'post1.jpg', 'public', '2020-08-02 16:37:38'),
(2, '4', 'we paid you. :\'(', 'post2.jpg', 'public', '2019-08-19 16:40:49'),
(3, '3', 'food....', 'post3.jpg', 'public', '2020-06-18 16:41:55'),
(4, '2', 'you never get it... ahahahaha', 'post4.jpg', 'public', '2020-08-13 18:20:59'),
(5, '6', 'new song coming soon...', NULL, 'friends', '2020-08-25 16:44:00'),
(6, '1', 'In order to provide the best possible experience to old and buggy browsers, Bootstrap uses CSS browser hacks in several places to target special CSS to certain browser versions in order to work around bugs in the browsers themselves. These hacks understandably cause CSS validators to complain that they are invalid. In a couple places, we also use bleeding-edge CSS features that aren’t yet fully standardized, but these are used purely for progressive enhancement.\r\n\r\nThese validation warnings don’t matter in practice since the non-hacky portion of our CSS does fully validate and the hacky portions don’t interfere with the proper functioning of the non-hacky portion, hence why we deliberately ignore these particular warnings.\r\n\r\nOur HTML docs likewise have some trivial and inconsequential HTML validation warnings due to our inclusion of a workaround for a certain Firefox bug.', NULL, 'public', '2020-08-12 16:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(10) NOT NULL,
  `postid` varchar(10) NOT NULL,
  `reporterid` varchar(10) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `postid`, `reporterid`, `reason`, `time`, `type`) VALUES
(1, '6', '3', 'spam', '2020-05-12 00:27:55', 'spam'),
(2, '2', '2', 'trolling us... ', '2020-08-12 00:31:33', 'Harassment'),
(3, '4', '4', 'he trolled me... :)', '2020-08-17 18:16:53', 'Harassment');

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `id` int(10) NOT NULL,
  `personid` int(10) NOT NULL,
  `postid` int(10) NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_cred`
--
ALTER TABLE `login_cred`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pid` (`pid`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`pageid`);

--
-- Indexes for table `pagefollower`
--
ALTER TABLE `pagefollower`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_admin`
--
ALTER TABLE `page_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_editor`
--
ALTER TABLE `page_editor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_info`
--
ALTER TABLE `personal_info`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `like`
--
ALTER TABLE `like`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_cred`
--
ALTER TABLE `login_cred`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `pageid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pagefollower`
--
ALTER TABLE `pagefollower`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_admin`
--
ALTER TABLE `page_admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_editor`
--
ALTER TABLE `page_editor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_info`
--
ALTER TABLE `personal_info`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `personal_info`
--
ALTER TABLE `personal_info`
  ADD CONSTRAINT `ID` FOREIGN KEY (`id`) REFERENCES `login_cred` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
