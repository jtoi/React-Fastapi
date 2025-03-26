Warning: World-writable config file '/etc/mysql/mariadb.conf.d/50-server.cnf' is ignored
-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: veascanF_db
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB-1:10.5.9+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('cddd6f02d06a');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_permission`
--

DROP TABLE IF EXISTS `group_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_permission` (
  `group_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  KEY `group_id` (`group_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `group_permission_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `group_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_permission`
--

LOCK TABLES `group_permission` WRITE;
/*!40000 ALTER TABLE `group_permission` DISABLE KEYS */;
INSERT INTO `group_permission` VALUES (1,1),(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(2,1),(2,5),(2,6),(2,7),(2,8),(1,9),(2,9);
/*!40000 ALTER TABLE `group_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_groups_id` (`id`),
  KEY `ix_groups_is_deleted` (`is_deleted`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'string',0,NULL,'2025-03-23 09:42:06',NULL),(2,'Administrator',0,'2025-03-23 11:47:25','2025-03-23 11:28:33',NULL);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menugral`
--

DROP TABLE IF EXISTS `menugral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menugral` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) DEFAULT NULL,
  `son` int(11) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `icon` varchar(150) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `permission_id` (`permission_id`),
  KEY `ix_menugral_id` (`id`),
  KEY `ix_menugral_is_active` (`is_active`),
  KEY `ix_menugral_is_deleted` (`is_deleted`),
  KEY `ix_menugral_son` (`son`),
  CONSTRAINT `menugral_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `menugral_ibfk_2` FOREIGN KEY (`son`) REFERENCES `menugral` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menugral`
--

LOCK TABLES `menugral` WRITE;
/*!40000 ALTER TABLE `menugral` DISABLE KEYS */;
INSERT INTO `menugral` VALUES (1,NULL,NULL,'Dashboard','/','faHome',50,1,0,NULL,'2025-03-23 14:57:49'),(2,NULL,NULL,'Configuración',NULL,'faCog',100,1,0,NULL,'2025-03-23 14:58:50'),(3,NULL,NULL,'Productos',NULL,'faBox',100,1,0,NULL,'2025-03-23 14:59:32'),(4,NULL,NULL,'Suministradores',NULL,'faTruck',150,1,0,NULL,'2025-03-23 15:00:11'),(5,NULL,NULL,'Cocina',NULL,'faUtensils',300,1,0,NULL,'2025-03-23 15:00:53'),(7,NULL,NULL,'Informes',NULL,'faChartBar',500,1,0,NULL,'2025-03-23 15:01:47'),(8,NULL,2,'Comercios','/comercios',NULL,50,1,0,NULL,'2025-03-23 15:10:03'),(9,NULL,4,'Suministradores','/suministradores',NULL,50,1,0,NULL,'2025-03-23 15:14:22'),(10,NULL,NULL,'Entrada - Salida',NULL,'faExchangeAlt',400,1,0,NULL,'2025-03-23 15:14:22'),(11,NULL,2,'Usuarios','/users',NULL,200,1,0,NULL,'2025-03-23 15:30:06'),(12,NULL,4,'Contactos Suministradores','/conta_sum',NULL,100,1,0,NULL,'2025-03-23 15:30:06'),(13,NULL,2,'Grupos','/groups',NULL,200,1,0,NULL,'2025-03-23 15:30:06'),(14,NULL,2,'Cambiar Contraseña','/change_pass',NULL,300,1,0,NULL,'2025-03-23 15:30:06'),(15,NULL,2,'Configuración','/settings',NULL,400,1,0,NULL,'2025-03-23 15:30:06'),(16,NULL,3,'Almacenes','/almacenes',NULL,50,1,0,NULL,'2025-03-23 15:30:06'),(17,NULL,3,'Productos','/productos',NULL,100,1,0,NULL,'2025-03-23 15:30:06'),(18,NULL,3,'Categorías de productos','/prod_cat',NULL,200,1,0,NULL,'2025-03-23 15:30:06'),(19,NULL,3,'Unidades de medida','/um',NULL,300,1,0,NULL,'2025-03-23 15:30:06'),(20,NULL,3,'Conversiones de unidades','/conver',NULL,400,1,0,NULL,'2025-03-23 15:30:06'),(21,NULL,4,'Pedidos','/pedidos',NULL,200,1,0,NULL,'2025-03-23 15:30:06'),(22,NULL,4,'Recepción mercancía','/recepcion',NULL,300,1,0,NULL,'2025-03-23 15:30:06'),(23,NULL,4,'Albaranes','/albaranes',NULL,400,1,0,NULL,'2025-03-23 15:30:06'),(25,NULL,5,'Platos','/platos',NULL,50,1,0,NULL,'2025-03-23 15:38:37'),(26,NULL,5,'Categoría de los platos','/palt_cat',NULL,100,1,0,NULL,'2025-03-23 15:38:37'),(27,NULL,5,'Escandallos','/escandallos',NULL,200,1,0,NULL,'2025-03-23 15:38:37'),(28,NULL,5,'Alérgenos','/alergenos',NULL,300,1,0,NULL,'2025-03-23 15:38:37'),(29,NULL,7,'Gastos','/gastos_inf',NULL,50,1,0,NULL,'2025-03-23 15:38:37'),(30,NULL,10,'Exp. / Imp. Productos','/inout',NULL,50,1,0,NULL,'2025-03-23 15:38:37');
/*!40000 ALTER TABLE `menugral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_permissions_name` (`name`),
  KEY `ix_permissions_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'view_groups','Ver Grupos de Usuarios'),(2,'create_groups','Crear  Grupos de Usuarios'),(3,'update_groups','Actualizar Grupos de Usuarios'),(4,'delete_groups','Borrar Grupos de Usuarios'),(5,'view_users','Ver Usuarios'),(6,'update_users','Actualizar Usuarios'),(7,'create__users','Crear Usuarios'),(8,'delete_users','Borrar Usuarios'),(9,'view_me','Ver los datos del usuario conectado'),(10,'view_gastos','Ver Gastos');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(120) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `is_revoked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_refresh_tokens_token` (`token`),
  KEY `user_id` (`user_id`),
  KEY `ix_refresh_tokens_id` (`id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (1,'75e28d2c-93d3-450c-a24e-acbb40ddab93',3,'2025-03-30 06:42:03',1),(2,'a3a46144-58ea-496f-91c0-663a4e904127',3,'2025-03-30 07:48:48',1),(3,'91d30a6d-6fe5-4370-ae46-2c54ce02c738',3,'2025-03-30 07:55:11',1),(4,'fb21fcbc-bd22-492d-ab8d-cb2a7fc24769',3,'2025-03-30 08:02:41',1),(5,'48c7dbac-0975-4932-abab-99b38a4cea81',3,'2025-03-30 08:25:37',1),(6,'8826f926-36e2-45e7-bd65-46fbf0f150c8',3,'2025-03-30 09:09:04',1),(7,'3f5d6058-6f50-4d43-b1b7-777569305510',3,'2025-03-30 09:53:28',1),(8,'070c77b3-d80a-4809-9b28-f392c4f59360',3,'2025-03-30 10:25:59',1),(9,'60ffe7af-9a01-461e-8646-15f4fb56e68e',3,'2025-03-30 11:04:02',1),(10,'ccaf3c27-be11-4016-92eb-116c5f01b373',3,'2025-03-30 11:36:23',1),(11,'d65bc6d2-f698-4a5d-b834-47ce0ea9442b',3,'2025-03-30 13:00:12',1),(12,'78bd51d8-78c0-44f3-8399-77c899ca67e0',3,'2025-03-30 13:34:23',1),(13,'ae5c7d33-e6cc-4c8d-a090-a6905be24a0e',3,'2025-03-30 15:03:07',1),(14,'2afed44f-e101-469f-aafd-ac1e469ec872',3,'2025-03-30 15:05:05',1),(15,'706d79d6-b3ad-4446-ad63-8704e3459050',3,'2025-03-30 15:59:17',1),(16,'9202099e-5252-401b-8de1-3e6df2402d89',3,'2025-03-30 16:29:20',1),(17,'71d65288-2828-4830-9bcf-979fbb540547',3,'2025-03-30 17:18:26',1),(18,'5c8af639-7cdf-4fd9-9c64-028a6da25f27',3,'2025-03-30 17:20:30',1),(19,'8c8b3af7-61c0-4e4f-8797-26f2f64e1248',3,'2025-03-30 17:20:54',1),(20,'f4aebb58-c064-4752-b8b7-096c36a8c44f',3,'2025-03-30 17:24:37',1),(21,'a3a9099b-b166-47df-8867-e4ba4848ca5e',3,'2025-03-30 17:28:17',1),(22,'3f64cfb0-4f42-493f-8839-2a05a4cc216a',3,'2025-03-30 19:18:00',1),(23,'8df97140-38f9-41de-a335-0ae49ba75b5f',3,'2025-03-30 19:53:09',1),(24,'98dd0157-287b-4131-bea0-ff2bbc5cbcf0',3,'2025-03-30 19:53:20',1),(25,'28858026-193a-4fdc-aedd-c9906e50d728',3,'2025-03-30 20:23:37',1),(26,'6b417117-5df8-4928-9fe1-fced30284006',3,'2025-03-31 05:56:09',1),(27,'3b8a144c-51da-48b1-936e-2765c57cc342',3,'2025-03-31 06:36:47',1),(28,'3be62dce-eb31-436f-ba01-596bed20b3b6',3,'2025-03-31 06:37:04',1),(29,'9fe10aa0-ccab-4076-a64d-3bbdbbb1b65e',3,'2025-03-31 07:49:01',1),(30,'19855ca8-b562-482d-b579-4f90269c6934',3,'2025-03-31 07:53:15',1),(31,'f0bc5dda-2408-491c-b217-ec46b2c607f6',3,'2025-03-31 08:25:03',1),(32,'55f5b7ea-fd61-4aac-a946-8aa537c1f842',3,'2025-03-31 08:59:02',1),(33,'d76cc817-27c9-40d6-85ba-92df29518371',3,'2025-03-31 09:29:40',1),(34,'27d96b2b-3310-455c-836b-775a8690b8ba',3,'2025-03-31 09:30:10',1),(35,'4edb0f51-11fe-4803-9169-33d36d2bbd78',3,'2025-03-31 10:01:14',1),(36,'2d9e13b0-92b5-45f4-a9bf-b2f9a1954e85',3,'2025-03-31 10:31:30',1),(37,'dd1832e6-00b2-4de3-8797-4bc4c9a7d79a',3,'2025-03-31 10:32:04',1),(38,'7f516ccf-f1e3-4c44-b0d5-c84f7bd2929d',3,'2025-03-31 11:05:32',1),(39,'d71b3bcf-c5d5-4dc6-afdb-03c39661ae6e',3,'2025-03-31 11:14:53',1),(40,'2e843db6-a580-414a-acbc-78b899598bae',3,'2025-03-31 11:52:19',1),(41,'5145d670-eced-4df9-9451-4d9e2be39b90',3,'2025-03-31 11:55:07',1),(42,'15ac4d02-412f-417c-9d6a-9b65346f9e32',3,'2025-03-31 12:46:40',1),(43,'e3265ca0-b770-4e3e-b4c9-831aec232411',3,'2025-03-31 13:41:34',1),(44,'4bde1e3d-492b-473b-b8b2-eb1dbaede5e7',3,'2025-03-31 14:18:50',1),(45,'fc535dfd-f816-48c5-be9f-9240d3c9c033',3,'2025-03-31 14:19:59',1),(46,'a6a7f081-aa87-4a83-8c6b-1c45439591f4',3,'2025-03-31 16:39:02',1),(47,'52dd72aa-01f5-455c-976a-7767e8e93b26',3,'2025-03-31 16:39:02',1),(48,'d025b3ed-8b71-457d-acfa-87260ac87259',3,'2025-03-31 17:10:13',1),(49,'86e4846c-6dc3-4c65-84c6-410fbaaadeae',3,'2025-03-31 17:14:17',1),(50,'87c0f90a-43d6-4c81-8529-3c4a45f561e9',3,'2025-03-31 17:59:13',1),(51,'82ff2ab9-6765-4bbb-8f13-38a414d3d946',3,'2025-03-31 18:18:09',1),(52,'0ffd4d99-bca8-4f98-add5-a8c998a0a8ac',3,'2025-03-31 18:19:27',1),(53,'03b07c91-ee4f-4ba0-9d07-ac96a308a904',3,'2025-03-31 18:23:21',1),(54,'e597d4c7-7192-439a-a836-f2957d8474f5',3,'2025-03-31 18:29:37',1),(55,'491d2385-1370-4fa5-b74c-a1830949463c',3,'2025-03-31 18:31:26',1),(56,'24c6195b-3666-4143-87bb-cb96f6776fdc',3,'2025-03-31 19:29:43',1),(57,'0cb1d328-1d1f-4175-8b20-838d34d7ac0d',3,'2025-04-01 10:08:03',1),(58,'ea93b81b-7072-45e0-945e-193f6fcf445a',3,'2025-04-01 11:28:15',1),(59,'1c7eea46-59d8-41a0-abad-2058fd875a1a',3,'2025-04-01 11:38:47',1),(60,'294bd4e2-432c-4960-8f20-4fbeac72dbb4',3,'2025-04-01 11:39:06',1),(61,'a1f6c0e5-b08a-4c37-82fc-c9e9f7ae2b88',3,'2025-04-01 12:02:14',1),(62,'77a91510-9a98-4609-9a76-418e95ac2082',3,'2025-04-01 13:13:33',1),(63,'7e862b2d-6b7e-4cd3-9fce-a530422d1336',3,'2025-04-01 13:45:38',1),(64,'2c88423d-a0f4-4686-b1d4-9ca35bcefca9',3,'2025-04-01 14:21:46',1),(65,'244c19b3-b42e-4586-9ba7-2999782d6571',3,'2025-04-01 14:22:44',1),(66,'65a879d1-70af-4d16-9536-410ab1f19c73',3,'2025-04-01 14:45:10',1),(67,'104857e4-772a-496c-b199-a78300691fb1',3,'2025-04-01 14:48:53',1),(68,'37f49ae2-d270-4652-bd86-383341680191',3,'2025-04-01 14:53:18',1),(69,'6d1a7982-4066-438d-9a03-ff1bd1d59cf1',3,'2025-04-01 14:54:07',1),(70,'c037db84-22a8-4fbe-9c81-d33fe9e6c986',3,'2025-04-01 16:04:49',1),(71,'1d085c86-2fba-417e-8b38-5b774ff1dcd8',3,'2025-04-01 16:05:22',1),(72,'38cde4a8-2051-4d11-ab6b-af7f60fb9fe4',3,'2025-04-01 16:10:54',1),(73,'71e9e40a-2e1f-49d8-99d4-5e68d4efe7c5',3,'2025-04-01 19:53:50',1),(74,'83d5706a-e87a-4e7a-a0e0-039decefeb32',3,'2025-04-01 20:19:54',1),(75,'1a3d7888-1286-4f4c-b4ec-d8e9074a65a1',3,'2025-04-01 20:19:54',1),(76,'0fbefb6d-6bb2-4274-b553-8d6cb16d487c',3,'2025-04-01 20:19:55',1),(77,'bd78867b-1f78-480c-a23c-0fa056f6a0d2',3,'2025-04-01 20:19:56',1),(78,'1ec1cbf6-9124-4215-acd6-3774c05c41d0',3,'2025-04-01 20:23:17',0);
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `username` varchar(150) DEFAULT NULL,
  `hashed_password` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_users_id` (`id`),
  KEY `ix_users_is_active` (`is_active`),
  KEY `ix_users_is_deleted` (`is_deleted`),
  KEY `ix_users_username` (`username`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'perejil','perejil@gmail.com','$2b$12$Ooqi6JYx/UPhljGJggHig.p3STP9KlRN.GpIfGX5pTKEJu8x8sxVK',1,0,'2025-03-21 06:48:21','2025-03-21 06:48:21',NULL),(2,'jacinto','jacinto@yopmail.com','$2b$12$Hg9fhfPq35o8njkN4enhLutl9VlZQ8pFMNn0GGfpbc2k6oz3HX5dm',1,0,'2025-03-21 07:21:38','2025-03-21 07:21:38',NULL),(3,'Jtoirac','jtoirac@gmail.com','$2b$12$Rr9nTVjOoFFsQM72G/N5xej6yo5Nu9vu6uYgW21dVIzDoxa0bRbdG',1,0,'2025-03-22 13:36:37','2025-03-22 13:36:37',2),(4,'Panchito Gómez','panchitin@example.com','$2b$12$/LnyhXMQ7kGP/.ShBFqSQ.N85CuBk2bmSBIXNtEaBG2pROvUoy71m',1,0,'2025-03-23 11:50:22','2025-03-23 12:50:22',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-26  9:09:51
