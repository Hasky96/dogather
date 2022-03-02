-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i6e104.p.ssafy.io    Database: dogather
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `post_no` int NOT NULL AUTO_INCREMENT,
  `writer_no` int NOT NULL,
  `board_title` varchar(250) NOT NULL,
  `board_content` varchar(45) NOT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `board_type` varchar(50) DEFAULT NULL,
  `board_view` int DEFAULT '0',
  PRIMARY KEY (`post_no`),
  KEY `writer_no_idx` (`writer_no`),
  CONSTRAINT `writer_no` FOREIGN KEY (`writer_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,1,'test ==update','test ==update','2022-02-06 22:37:45','2022-02-07 13:38:44',NULL,1),(2,1,'test2 ==update','test2 ==update','2022-02-06 22:40:28','2022-02-07 13:37:41',NULL,0),(3,1,'test3 ==update','test 3==update','2022-02-07 13:40:09','2022-02-07 14:44:05',NULL,0),(4,1,'test3','test3','2022-02-07 17:46:59',NULL,NULL,0),(5,1,'끼','낑','2022-02-08 11:47:05',NULL,NULL,0),(6,1,'끼잉','낑끼','2022-02-08 11:49:14',NULL,NULL,0),(7,1,'끼잉','낑끼','2022-02-08 14:12:29',NULL,NULL,0),(8,1,'끼잉','낑끼','2022-02-08 15:43:33',NULL,NULL,0),(9,1,'ㄴㄷㅇㄹㄴㅇㄹ','ㅇㄴㄹㄴㅇ','2022-02-08 06:49:23',NULL,NULL,0),(10,1,'제목','내용','2022-02-08 06:50:27',NULL,NULL,0),(11,1,'된다','된다','2022-02-08 07:04:40',NULL,NULL,0),(12,1,'된다','된다','2022-02-08 07:09:39',NULL,NULL,0),(13,1,'제발','되라','2022-02-08 07:10:54',NULL,NULL,0),(14,1,'히히','히히','2022-02-08 07:13:01',NULL,NULL,0),(15,1,'dsfdsf','sdfdsf','2022-02-08 15:51:06',NULL,NULL,0),(16,1,'dsfdsf','sdfsdf','2022-02-08 15:51:50',NULL,NULL,0),(17,1,'dsfdsf','sdf','2022-02-09 01:35:25',NULL,NULL,0);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 10:23:01
