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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `user_pw` varchar(100) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `user_addr` varchar(100) NOT NULL,
  `user_addr_detail` varchar(100) NOT NULL,
  `user_zip` int NOT NULL,
  `user_tel` varchar(12) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (32,'wonjong','eb0f08df4490a936686900f130b51868a6f7a9ae73ac4fd4386660b2c3003a48','SSAFY6기 화이팅','SSAFY6기 화이팅','부산광역시 강서구 녹산산업중로 333','SSAFY 부울경 캠퍼스',46754,'2132134','testEmail@nfewf.com'),(33,'corea1836','febd93f04bda1aec0d374f8fd014d062525934feb1f1b81ee7c64d61f66b84b1','홍지범','아무거나','경북 포항시 남구 해도동 120-28','120-28',37819,'010123456789','dogateh@gmail.com'),(34,'ssafy0826','70bc6a17b2670688f78df8f6a7c2efe1cbc6fdee3dd7b2cc5c5fe0459f93dffc','윤석열','대통령','서울 종로구 청와대로 1','청와대',3048,'01011111111','president@korea.co.kr'),(35,'asase','febd93f04bda1aec0d374f8fd014d062525934feb1f1b81ee7c64d61f66b84b1','장원종','원종원종','경기 성남시 분당구 판교역로 4','1234',13536,'010123456789','dogateh@gmail.com'),(36,'jinseong','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','진성','jinseong','부산 사하구 낙동남로1389번길 1','리온 903호',49313,'01012341234','jinseong@naver.com'),(37,'test','a873f45bb147c6580489e051e972e4b30ae8782c07d6004ade5f2a9dc2acf0cb','테스트','test','부산 사상구 가야대로 1','2',46990,'01011111111','test@test.com'),(38,'ssafy6','bdb6424f553e8068a1642627adfcc33947d9c7a958d7a56e89df5a756e3c1fba','윤싸피','윤싸피','부산광역시 강서구 녹산산업중로 333','SSAFY 부울경 캠퍼스',46754,'01012345678','yoonssafy@ssafy.com'),(39,'gh0jhs','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','길동','gh0jhs','경기 수원시 권선구 여기산로 2','903호',16428,'01012384152','leeeko@naver.com'),(40,'gh1jhs','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','박성진','gh1jhs','경기 수원시 영통구 덕영대로 지하 1520','아이파크 203호',16690,'01075294451','jinseon33@naver.com'),(41,'gh2jhs','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','이지혜','Looe','경기 수원시 장안구 덕영대로407번길 80','아이파크 1013호',16356,'01077451151','looem@naver.com'),(52,'wooyoung82','97d90fb73434600be8068ff4e5fd08a40a17aa67e8946f3e73ec2b586e2b5d24','최우영','싸피부울경의간지미남','서울 강남구 테헤란로 212','부산인데?',6220,'01012345678','wooyoung82@ssafy.com'),(53,'wonsuck','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','원석','wonsuck','경기 성남시 분당구 대왕판교로606번길 45','201호',13524,'01051516452','wonsuck@gmail.com'),(54,'dasol','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','다솔','dasol','제주특별자치도 제주시 가령로 1','가령아파트 2동 501호',63214,'01082525252','gh0jhs@naver.com'),(55,'saeroi','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','박새로이','saeroi','서울 용산구 녹사평대로 132','단밤',4390,'01051513484','itaewon@naver.com'),(56,'elow8','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','정귀남','귀남','울산 북구 효산1길 19','효산아파트 2동 501호',44252,'01084261512','lllokopl@naver.com'),(57,'jihee','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','강지희','jihee','경북 상주시 외서면 낙원동길 12','아이파크 1013호',37133,'01051538462','jihee@naver.com'),(58,'mmuus','2d4f1558744688ffa58cefa714ae992e297ab4cc8dbf4637dd455da2e123ede9','홍광호','mmuus','경기 성남시 분당구 삼평동 681','아이파크 1013호',13494,'01051584621','ghlkll@gmail.com'),(59,'ssafy6th','bdb6424f553e8068a1642627adfcc33947d9c7a958d7a56e89df5a756e3c1fba','싸피화이팅','싸피6기빠이팅','부산 강서구 녹산산업중로 333','SSAFY 부울경 캠퍼스',46754,'01066666666','ssafy@naver.com'),(60,'ssafy6666','bdb6424f553e8068a1642627adfcc33947d9c7a958d7a56e89df5a756e3c1fba','싸피싸피윤싸피','열정6기핫식스','부산 강서구 녹산산업중로 333','SSAFY 부울경 캠퍼스',46754,'01066666666','ssafy@ssafy.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 10:23:03
