CREATE DATABASE  IF NOT EXISTS `mk2s_hotel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mk2s_hotel`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mk2s_hotel
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`country`),
  UNIQUE KEY `country_UNIQUE` (`country`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`country`,`state`),
  KEY `INDEX` (`state`),
  CONSTRAINT `FK_STATE_COUNTRY_LINK` FOREIGN KEY (`country`) REFERENCES `country` (`country`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  PRIMARY KEY (`city`,`state`),
  KEY `FK_CITY_STATE_LINK_idx` (`state`),
  CONSTRAINT `FK_CITY_STATE_LINK` FOREIGN KEY (`state`) REFERENCES `state` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `admin_roles`
--

DROP TABLE IF EXISTS `admin_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_roles` (
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='This contain roles for the MK2S LLC Employees';



--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adm_id` int unsigned NOT NULL AUTO_INCREMENT,
  `adm_username` varchar(12) NOT NULL,
  `adm_email` varchar(120) NOT NULL,
  `adm_phone` varchar(13) NOT NULL,
  `adm_password` varchar(255) NOT NULL,
  `adm_name` varchar(50) NOT NULL,
  `adm_gender` enum('Male','Female','Transgender') NOT NULL,
  `adm_dob` date NOT NULL,
  `adm_role` varchar(50) NOT NULL,
  `adm_doj` date NOT NULL,
  `adm_last_login` timestamp NOT NULL,
  `adm_last_login_ip` varchar(60) NOT NULL,
  `adm_address` varchar(50) NOT NULL,
  `adm_city` varchar(50) NOT NULL,
  `adm_state` varchar(50) NOT NULL,
  `adm_country` varchar(50) NOT NULL,
  `adm_zip_code` varchar(10) NOT NULL,
  `adm_added_by` int unsigned NOT NULL,
  `adm_added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `adm_updated_by` int unsigned NOT NULL,
  `adm_updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `adm_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`adm_id`),
  UNIQUE KEY `adm_email_UNIQUE` (`adm_email`),
  UNIQUE KEY `adm_phone_UNIQUE` (`adm_phone`),
  KEY `FK_ADM_CITY_idx` (`adm_city`),
  KEY `FK_ADM_STATE_idx` (`adm_state`),
  KEY `FK_ADM_COUNTRY_idx` (`adm_country`),
  KEY `FK_ADM_ADDED_BY_idx` (`adm_added_by`),
  KEY `FK_ADM_MODIFIED_BY_idx` (`adm_updated_by`),
  CONSTRAINT `FK_ADM_ADDED_BY` FOREIGN KEY (`adm_added_by`) REFERENCES `admin` (`adm_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_ADM_CITY` FOREIGN KEY (`adm_city`) REFERENCES `city` (`city`) ON UPDATE CASCADE,
  CONSTRAINT `FK_ADM_COUNTRY` FOREIGN KEY (`adm_country`) REFERENCES `country` (`country`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_ADM_STATE` FOREIGN KEY (`adm_state`) REFERENCES `state` (`state`) ON UPDATE CASCADE,
  CONSTRAINT `FK_ADM_UPDATED_BY` FOREIGN KEY (`adm_updated_by`) REFERENCES `admin` (`adm_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='This table contains details about the employees or admins under MK2S_LLC.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `client_id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_name` varchar(50) NOT NULL,
  `client_web_domain` varchar(120) NOT NULL,
  `client_official_email` varchar(120) NOT NULL,
  `client_official_contact` varchar(13) NOT NULL,
  `client_owner` varchar(120) NOT NULL,
  `client_owner_email` varchar(120) NOT NULL,
  `client_owner_phone` varchar(13) NOT NULL,
  `client_owner_address` varchar(100) NOT NULL,
  `client_owner_city` varchar(50) NOT NULL,
  `client_owner_state` varchar(50) NOT NULL,
  `client_owner_country` varchar(50) NOT NULL,
  `client_owner_zip_code` varchar(10) NOT NULL,
  `client_address` varchar(100) NOT NULL,
  `client_city` varchar(50) NOT NULL,
  `client_state` varchar(50) NOT NULL,
  `client_country` varchar(50) NOT NULL,
  `client_zip_code` varchar(10) NOT NULL,
  `client_spoc` varchar(50) NOT NULL,
  `client_spoc_email` varchar(50) NOT NULL,
  `client_spoc_phone` varchar(50) NOT NULL,
  `client_added_by` int unsigned NOT NULL,
  `client_updated_by` int unsigned NOT NULL,
  `client_added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `client_updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `client_active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `client_web_domain_UNIQUE` (`client_web_domain`),
  UNIQUE KEY `client_official_email_UNIQUE` (`client_official_email`),
  KEY `FK_CLIENT_CITY_LINK_idx` (`client_owner_city`,`client_city`),
  KEY `FK_CLIENT_STATE_LINK_idx` (`client_owner_state`),
  KEY `FK_CLIENT_COUNTRY_LINK_idx` (`client_owner_country`),
  KEY `FK_CLIENT_OWNER_CITY_LINK_idx` (`client_city`),
  KEY `FK_CLIENT_OWNER_STATE_LINK_idx` (`client_state`),
  KEY `FK_CLIENT_OWNER_COUNTRY_idx` (`client_country`),
  KEY `FK_CLIENT_ADMIN_ADDED_BY_idx` (`client_added_by`),
  KEY `FK_CLIENT_ADMIN_UPDATED_BY_idx` (`client_updated_by`),
  CONSTRAINT `FK_CLIENT_ADMIN_ADDED_BY` FOREIGN KEY (`client_added_by`) REFERENCES `admin` (`adm_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_ADMIN_UPDATED_BY` FOREIGN KEY (`client_updated_by`) REFERENCES `admin` (`adm_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_CITY_LINK` FOREIGN KEY (`client_owner_city`) REFERENCES `city` (`city`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_COUNTRY_LINK` FOREIGN KEY (`client_owner_country`) REFERENCES `country` (`country`) ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_OWNER_CITY_LINK` FOREIGN KEY (`client_city`) REFERENCES `city` (`city`) ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_OWNER_COUNTRY` FOREIGN KEY (`client_country`) REFERENCES `country` (`country`) ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_OWNER_STATE_LINK` FOREIGN KEY (`client_state`) REFERENCES `state` (`state`) ON UPDATE CASCADE,
  CONSTRAINT `FK_CLIENT_STATE_LINK` FOREIGN KEY (`client_owner_state`) REFERENCES `state` (`state`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-11 16:14:49

-- Altered ADMIN table
ALTER TABLE `admin` 
ADD INDEX `FK_ADM_ROLE_LINK_idx` (`adm_role` ASC) VISIBLE;

ALTER TABLE `admin` 
ADD CONSTRAINT `FK_ADM_ROLE_LINK`
  FOREIGN KEY (`adm_role`)
  REFERENCES `mk2s_hotel`.`admin_roles` (`role`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `admin` 
CHANGE COLUMN `adm_last_login` `adm_last_login` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `adm_last_login_ip` `adm_last_login_ip` VARCHAR(60) NOT NULL DEFAULT '0:0:0:0';


