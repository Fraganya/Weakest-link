/*
SQLyog Enterprise - MySQL GUI v8.14 
MySQL - 5.7.11 : Database - wkl
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`wkl` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `wkl`;

/*Table structure for table `wkl_answers` */

DROP TABLE IF EXISTS `wkl_answers`;

CREATE TABLE `wkl_answers` (
  `answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `to_qid` int(11) NOT NULL,
  `answer` varchar(50) NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `to_qid` (`to_qid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `wkl_answers` */

insert  into `wkl_answers`(`answer_id`,`to_qid`,`answer`) values (10,12,'daemon');

/*Table structure for table `wkl_games` */

DROP TABLE IF EXISTS `wkl_games`;

CREATE TABLE `wkl_games` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_tag` varchar(25) DEFAULT NULL,
  `play_time` int(11) DEFAULT '0',
  `questions` int(11) DEFAULT '0',
  `accuracy` int(11) DEFAULT NULL,
  `difficulty` varchar(15) NOT NULL,
  `type` varchar(20) NOT NULL,
  `player_count` int(11) NOT NULL,
  `winner` text,
  `status` varchar(10) DEFAULT NULL,
  `money` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`game_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `wkl_games` */

/*Table structure for table `wkl_players` */

DROP TABLE IF EXISTS `wkl_players`;

CREATE TABLE `wkl_players` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_tag` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `sname` varchar(30) NOT NULL,
  `location` varchar(30) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `flags` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`player_id`),
  KEY `game_tag` (`game_tag`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `wkl_players` */

/*Table structure for table `wkl_questions` */

DROP TABLE IF EXISTS `wkl_questions`;

CREATE TABLE `wkl_questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `category` varchar(40) NOT NULL,
  `difficulty` varchar(15) NOT NULL,
  `last_access` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/*Data for the table `wkl_questions` */

insert  into `wkl_questions`(`question_id`,`question`,`category`,`difficulty`,`last_access`) values (12,'What Linux word is synonymous with the word service as used by the windows operating system?','computers','brainy','2016-10-20 14:32:25');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
