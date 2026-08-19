-------------------------- MAT GEO ----------------------

CREATE TABLE mst_geo (
	geo_id SMALLSERIAL PRIMARY KEY,
	reg_no VARCHAR(100) NOT NULL,
	reg_nm VARCHAR(255) NOT NULL,
	date TIMESTAMP,
    region VARCHAR(255) NOT NULL,
	plan_prod_amt VARCHAR(50),
	org_info VARCHAR(50)
);


-------------------------- MAT TYPE ----------------------
CREATE TABLE tmpl_mat_tp (
	mat_tp_cd VARCHAR(1) PRIMARY KEY,
	mat_tp_nm VARCHAR(50)
);

INSERT INTO tmpl_mat_tp (mat_tp_cd,mat_tp_nm) VALUES
	('P','가공식품'),
	('D','음식'),
	('R','원재료성 식품');

-------------------------- MAT CAT ----------------------
CREATE TABLE tmpl_mat_cat (
	mat_cat_id SMALLSERIAL PRIMARY KEY,
	mat_cat_cd VARCHAR(3),
	mat_cat_nm VARCHAR(50),
	mat_tp_cd VARCHAR(1),
	FOREIGN KEY (mat_tp_cd) REFERENCES tmpl_mat_tp (mat_tp_cd)
);

-------------------------- MAT REP ----------------------

CREATE TABLE tmpl_mat_rep (
	mat_rep_id SERIAL PRIMARY KEY,
	mat_rep_nm VARCHAR(50),
	mat_cat_id SMALLINT,
	FOREIGN KEY (mat_cat_id) REFERENCES tmpl_mat_cat (mat_cat_id)
);

-------------------------- EYE REFERENCE ----------------------
CREATE TABLE mst_mat_eye_ref (
	eye_ref_id SMALLINT PRIMARY KEY,
	eye_ref_nm VARCHAR(10) NOT NULL,
    eye_ref_wgt NUMERIC(10,3) NOT NULL,
    eye_ref_unit_cd VARCHAR(10) NOT NULL
);

INSERT INTO mst_mat_eye_ref (eye_ref_id, eye_ref_nm, eye_ref_wgt, eye_ref_unit_cd)
VALUES 
(1,'작은술',6,'GAM'),
(2,'큰술',15,'GAM'),
(3,'컵',233,'GAM'),
(4,'수저',8,'GAM'),
(5,'찻수저',2,'GAM'),
(6,'작은술',3,'GAM'),
(7,'큰술',8,'GAM'),
(8,'수저',12,'GAM'),
(9,'찻수저',3,'GAM'),
(10,'작은술',3,'GAM'),
(11,'큰술',8,'GAM'),
(12,'컵',85,'GAM'),
(13,'컵',140,'GAM'),
(14,'큰술',12,'GAM'),
(15,'수저',13,'GAM'),
(16,'큰술',6,'GAM'),
(17,'큰술',17,'GAM'),
(18,'큰술',6,'GAM'),
(19,'작은술',4,'GAM'),
(20,'큰술',12,'GAM'),
(21,'작은술',8,'GAM'),
(22,'큰술',25,'GAM'),
(23,'수저',21,'GAM'),
(24,'찻수저',7,'GAM'),
(25,'작은술',2,'GAM'),
(26,'큰술',6,'GAM'),
(27,'수저',6,'GAM'),
(28,'찻수저',1,'GAM'),
(29,'컵',150,'GAM'),
(30,'컵',160,'GAM'),
(31,'작은술',2,'GAM'),
(32,'작은술(1ts)',1.9,'GAM'),
(33,'큰술(1TS)',5.6,'GAM'),
(34,'컵',72,'GAM'),
(35,'작은술',7,'GAM'),
(36,'큰술',19,'GAM'),
(37,'수저',12,'GAM'),
(38,'찻수저',3,'GAM'),
(39,'큰술',10,'GAM'),
(40,'수저',9,'GAM'),
(41,'컵',160,'GAM'),
(42,'개',4,'GAM'),
(43,'작은술',8,'GAM'),
(44,'큰술',24,'GAM'),
(45,'컵',242,'GAM'),
(46,'수저',21,'GAM'),
(47,'찻수저',7,'GAM'),
(48,'작은술',4,'GAM'),
(49,'큰술',7,'GAM'),
(50,'큰술',15,'GAM'),
(51,'개',7,'GAM'),
(52,'작은술',5,'GAM'),
(53,'큰술',15,'GAM'),
(54,'큰술',15,'GAM'),
(55,'쪽',5,'GAM'),
(56,'작은술',6,'GAM'),
(57,'큰술',15,'GAM'),
(58,'수저',17,'GAM'),
(59,'찻수저',5,'GAM'),
(60,'작은술',5,'GAM'),
(61,'큰술',15,'GAM'),
(62,'수저',15,'GAM'),
(63,'찻수저',4,'GAM'),
(64,'작은술',5.3,'GAM'),
(65,'큰술',16,'GAM'),
(66,'큰술',12,'GAM'),
(67,'작은술',5,'GAM'),
(68,'큰술',15,'GAM'),
(69,'작은술(1ts)',2.8,'GAM'),
(70,'큰술(1TS)',8.6,'GAM'),
(71,'컵',120,'GAM'),
(72,'작은술(1ts)',6.1,'GAM'),
(73,'큰술(1TS)',17.9,'GAM'),
(74,'컵',243,'GAM'),
(75,'작은술(1ts)',6,'GAM'),
(76,'큰술(1TS)',20,'GAM'),
(77,'컵',278,'GAM'),
(78,'큰술',18,'GAM'),
(79,'작은술',3,'GAM'),
(80,'큰술',9,'GAM'),
(81,'컵',120,'GAM'),
(82,'작은술',2,'GAM'),
(83,'작은술',3,'GAM'),
(84,'컵',110,'GAM'),
(85,'수저',9,'GAM'),
(86,'찻수저',2,'GAM'),
(87,'개',9,'GAM'),
(88,'작은술',4,'GAM'),
(89,'큰술',12,'GAM'),
(90,'수저',13,'GAM'),
(91,'찻수저',3,'GAM'),
(92,'작은술',5,'GAM'),
(93,'큰술',10,'GAM'),
(94,'컵',155,'GAM'),
(95,'컵',105,'GAM'),
(96,'작은술',3,'GAM'),
(97,'큰술',8,'GAM'),
(98,'수저',7,'GAM'),
(99,'찻수저',2,'GAM'),
(100,'작은술',2,'GAM'),
(101,'큰술',5,'GAM'),
(102,'컵',40,'GAM'),
(103,'수저',5,'GAM'),
(104,'찻수저',1,'GAM'),
(105,'큰술',15,'GAM'),
(106,'큰술',15,'GAM'),
(107,'수저',20,'GAM'),
(108,'작은술(1ts)',3.7,'GAM'),
(109,'큰술(1TS)',10.5,'GAM'),
(110,'컵',130,'GAM'),
(111,'큰술',6,'GAM'),
(112,'컵',165,'GAM'),
(113,'수저',15,'GAM'),
(114,'찻수저',5,'GAM'),
(115,'작은술',3,'GAM'),
(116,'큰술',8,'GAM'),
(117,'수저',10,'GAM'),
(118,'찻수저',2,'GAM'),
(119,'작은술',4,'GAM'),
(120,'큰술',11,'GAM'),
(121,'수저',10,'GAM'),
(122,'찻수저',2,'GAM'),
(123,'컵',155,'GAM'),
(124,'큰술',20,'GAM'),
(125,'큰술',20,'GAM'),
(126,'작은술',5,'GAM'),
(127,'큰술',13,'GAM'),
(128,'수저',8,'GAM'),
(129,'찻수저',2,'GAM'),
(130,'컵',165,'GAM'),
(131,'큰술(1TS)',7,'GAM'),
(132,'컵',105,'GAM'),
(133,'작은술',5,'GAM'),
(134,'컵',130,'GAM'),
(135,'작은술',4,'GAM'),
(136,'큰술',14,'GAM'),
(137,'수저',17,'GAM'),
(138,'큰술',15,'GAM'),
(139,'큰술',15,'GAM'),
(140,'컵',200,'GAM'),
(141,'개',5,'GAM'),
(142,'큰술',15,'GAM'),
(143,'작은술',3,'GAM'),
(144,'찻수저',1,'GAM'),
(145,'큰술',9,'GAM'),
(146,'컵',100,'GAM'),
(147,'작은술(1ts)',7.1,'GAM'),
(148,'큰술(1TS)',21.1,'GAM'),
(149,'컵',283,'GAM'),
(150,'큰술',12,'GAM'),
(151,'컵',155,'GAM'),
(152,'수저',10,'GAM'),
(153,'작은술',5,'GAM'),
(154,'큰술',14,'GAM'),
(155,'수저',7,'GAM'),
(156,'찻수저',2,'GAM'),
(157,'컵',165,'GAM'),
(158,'컵',95,'GAM'),
(159,'큰술',15,'GAM'),
(160,'장',20,'GAM'),
(161,'수저',14,'GAM'),
(162,'찻수저',6,'GAM'),
(163,'작은술',5,'GAM'),
(164,'큰술',8,'GAM'),
(165,'작은술',1,'GAM'),
(166,'큰술',4,'GAM'),
(167,'수저',4,'GAM'),
(168,'찻수저',1,'GAM'),
(169,'봉지',12,'GAM'),
(170,'작은술',6,'GAM'),
(171,'큰술',12,'GAM'),
(172,'찻수저',2,'GAM'),
(173,'작은술',2.5,'GAM'),
(174,'작은술',3,'GAM'),
(175,'큰술',3,'GAM'),
(176,'수저',3,'GAM'),
(177,'작은술',4,'GAM'),
(178,'수저',6,'GAM'),
(179,'큰술',15,'GAM'),
(180,'작은술',5,'GAM'),
(181,'큰술',16,'GAM'),
(182,'수저',17,'GAM'),
(183,'찻수저',5,'GAM'),
(184,'큰술',17,'GAM'),
(185,'작은술',2,'GAM'),
(186,'큰술',7,'GAM'),
(187,'수저',8,'GAM'),
(188,'찻수저',2,'GAM'),
(189,'컵',105,'GAM'),
(190,'작은술',3,'GAM'),
(191,'큰술',6,'GAM'),
(192,'수저',7,'GAM'),
(193,'찻수저',3,'GAM'),
(194,'작은술',2,'GAM'),
(195,'큰술',16,'GAM'),
(196,'수저',17,'GAM'),
(197,'찻수저',1,'GAM'),
(198,'작은술',0.3,'GAM'),
(199,'컵',160,'GAM'),
(200,'큰술',15,'GAM'),
(201,'큰술',15,'GAM'),
(202,'컵',155,'GAM'),
(203,'큰술',12,'GAM'),
(204,'작은술',4,'GAM'),
(205,'큰술',11,'GAM'),
(206,'수저',16,'GAM'),
(207,'찻수저',3,'GAM'),
(208,'작은술(1ts)',3,'GAM'),
(209,'큰술(1TS)',8.6,'GAM'),
(210,'큰술',15,'GAM'),
(213,'큰술',15,'GAM'),
(214,'컵',105,'GAM'),
(215,'작은술',5,'GAM');


------------------------- MATERIAL --------------------------

CREATE TABLE mst_mat (
    mat_cd VARCHAR(10) PRIMARY KEY,
    mat_org_cd VARCHAR(50),
	mat_org_nm VARCHAR(100),
	mat_rep_id INTEGER,
    unit_cd VARCHAR(10),
	eye_ref_id SMALLINT,
	cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (mat_rep_id) REFERENCES tmpl_mat_rep (mat_rep_id) ON DELETE SET NULL,
	FOREIGN KEY (eye_ref_id) REFERENCES mst_mat_eye_ref (eye_ref_id) ON DELETE SET NULL
);
--create sequence and trigger for mst_mat
CREATE SEQUENCE mat_cd_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE OR REPLACE FUNCTION generate_mat_cd()
RETURNS TRIGGER AS $$
BEGIN
    NEW.mat_cd := 'MT' || TO_CHAR(nextval('mat_cd_seq'), 'FM00000000');

	IF NEW.mat_org_cd IS NULL THEN
        NEW.mat_org_cd := NEW.mat_cd;
    END IF;
	
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_mat_cd
BEFORE INSERT ON mst_mat
FOR EACH ROW
WHEN (NEW.mat_cd IS NULL)
EXECUTE FUNCTION generate_mat_cd();


------------------ TEMPLATE MAT GEO -------------------------
CREATE TABLE tmpl_mat_geo (
    mat_cd VARCHAR(10),
    geo_id SMALLINT,
    PRIMARY KEY (mat_cd, geo_id),
	FOREIGN KEY (mat_cd) REFERENCES mst_mat (mat_cd) ON DELETE SET NULL,
	FOREIGN KEY (geo_id) REFERENCES mst_geo (geo_id) ON DELETE SET NULL
);
