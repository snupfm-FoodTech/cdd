--------------- TEMPLATE DIET STANDARD ------------------
CREATE TABLE tmpl_diet_std (
    tmpl_std_cd VARCHAR(10) PRIMARY KEY,
    tmpl_std_nm VARCHAR(50) UNIQUE,
	tmpl_std_tp_cd VARCHAR(10),
    dp_seq int2
);


INSERT INTO tmpl_diet_std (tmpl_std_cd, tmpl_std_nm, tmpl_std_tp_cd, dp_seq)
VALUES 
    ('SD00000001', '당뇨환자 식단', 'A', 1),
    ('SD00000002', '신장질환환자(투석) 식단', 'A', 2),
    ('SD00000003', '암환자 식단', 'A', 4),
    ('SD00000004', '저당 식단', 'B', 7),
    ('SD00000005', '저염 식단', 'B', 8),
    -- ('SD00000006', '저열량 식단', 'B'),
    ('SD00000007', '고단백 식단', 'B', 9),
    ('SD00000008', '신장질환환자(비투석) 식단', 'A', 3),
    ('SD00000009', '고혈압 환자 식단', 'A', 5),
    ('SD00000010', '비만 관리 식단', 'A', 6),
	('USR', '사용자 식단', null, 100);


CREATE TABLE tmpl_diet_std_dtl (
    tmpl_std_cd VARCHAR(10),
    tmpl_nutr_cd VARCHAR(10),
    tmpl_nutr_mand_flg VARCHAR(1),
    tmpl_nutr_wgt_fm NUMERIC(20, 10),
    tmpl_nutr_wgt_to NUMERIC(20, 10),
	tmpl_nutr_foml VARCHAR(50),
    PRIMARY KEY (tmpl_std_cd, tmpl_nutr_cd),
    FOREIGN KEY (tmpl_std_cd) REFERENCES tmpl_diet_std(tmpl_std_cd) ON DELETE CASCADE, 
    FOREIGN KEY (tmpl_nutr_cd) REFERENCES mst_nutr(nutr_cd) ON DELETE CASCADE 
);

INSERT INTO tmpl_diet_std_dtl (tmpl_std_cd, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml)
VALUES
('SD00000001', 'ENG', 'Y', 500, 800, null),
('SD00000001', 'SUGAR', 'N', null, null, '총 열량의 10% 미만'),
('SD00000001', 'PROTEIN', 'N', 18, null, null),
('SD00000001', 'NA', 'N', null, 1350, null),
('SD00000001', 'SFA', 'N', null, null, '총 열량의 10% 미만'),
('SD00000002', 'ENG', 'Y', 500, 800, null),
('SD00000002', 'PROTEIN', 'N', null, null, '총 열량의 12% 이상'),
('SD00000002', 'NA', 'N', null, 650, null),
('SD00000003', 'ENG', 'Y', 500, 800, null),
('SD00000003', 'PROTEIN', 'N', null, null, '총 열량의 18% 이상'),
('SD00000003', 'FAT', 'N', null, null, '총 열량의 15~35%'),
('SD00000003', 'NA', 'N', null, 1350, null),
('SD00000003', 'SFA', 'N', null, null, '총 열량의 7% 이하'),
('SD00000004', 'SUGAR', 'N', null, null, '100g당 5g 미만'),
('SD00000005', 'NA', 'N', null, null, '100g당 120mg 미만'),
-- ('SD00000006', 'ENG', 'Y', null, null, '100g당 40 kcal 미만'),
('SD00000007', 'PROTEIN', 'N', null, null, '100kcal 당 5.5g 이상'),

('SD00000008', 'ENG', 'Y', 500, 800, null),
('SD00000008', 'PROTEIN', 'N', null, null, '총 열량의 10% 이하'),
('SD00000008', 'NA', 'N', null, 650, null),

('SD00000009', 'ENG', 'Y', 500, 800, null),
('SD00000009', 'FAT', 'N', null, null, '총 열량의 15~30%'),
('SD00000009', 'SFA', 'N', null, null, '총 열량의 10% 이하'),
('SD00000009', 'K', 'N', 700, null, null),
('SD00000009', 'FIBER', 'N', 7, null, null),

('SD00000010', 'ENG', 'Y', 500, 600, null),
('SD00000010', 'SUGAR', 'N', null, null, '총 열량의 10% 미만'),
('SD00000010', 'PROTEIN', 'N', 18, null, null),
('SD00000010', 'FAT', 'N', null, null, '총 열량의 15~30%'),
('SD00000010', 'SFA', 'N', null, null, '총 열량의 10% 미만'),
('SD00000010', 'NA', 'N', null, 1000, null),

('USR', 'ENG', 'Y', 500, 800, null),
('USR', 'NA', 'N', null, 1350, null),
('USR', 'CHO', 'N', 68.75, 130, null),
('USR', 'SUGAR', 'N', 12.5, 40, null),
('USR', 'PROTEIN','N', 18, null, null),
('USR', 'FAT', 'N', 8.3, 26.7, null),
('USR', 'TRANS', 'N', null, 0.9, null),
('USR', 'SFA', 'N', null, 7.1, null),
('USR', 'CHOLE', 'N', null, 100, null);


--------------- TEMPLATE TRAY ----------------
CREATE TABLE tmpl_tray (
    tmpl_tray_cd VARCHAR(10) PRIMARY KEY,
    tmpl_tray_nm VARCHAR(50) NOT NULL UNIQUE,
	tmpl_rep_tray_cd VARCHAR(10) NOT NULL
);

INSERT INTO tmpl_tray (tmpl_tray_cd, tmpl_tray_nm, tmpl_rep_tray_cd) VALUES
('TR00000001', '4찬 한식', 'A'),
('TR00000002', '5찬 한식', 'B'),
('TR00000003', '6찬 한식', 'C'),
('TR00000004', '7찬 한식', 'D');



CREATE TABLE tmpl_tray_dtl (
    tmpl_tray_cd VARCHAR(10),
    tmpl_fd_seq SMALLINT,
    tmpl_fd_mand_flg VARCHAR(1),
    tmpl_fd_sep_flg VARCHAR(1),
    tmpl_fd_capa_vol SMALLINT NOT NULL,
    fd_tp_cd VARCHAR(10) NOT NULL,
    unit_cd VARCHAR(10) NOT NULL,
    PRIMARY KEY (tmpl_tray_cd, tmpl_fd_seq),
    FOREIGN KEY (tmpl_tray_cd) REFERENCES tmpl_tray(tmpl_tray_cd) ON DELETE CASCADE
);

INSERT INTO tmpl_tray_dtl (tmpl_tray_cd, tmpl_fd_seq, tmpl_fd_mand_flg, tmpl_fd_sep_flg, tmpl_fd_capa_vol, fd_tp_cd, unit_cd)
VALUES
('TR00000001',1,'Y','N',650,'FT00001','ML'),
('TR00000001',2,'N','N',125,'FT00003','ML'),
('TR00000001',3,'N','N',75,'FT00005','ML'),
('TR00000001',4,'N','N',400,'FT00004','ML'),
('TR00000001',5,'Y','Y',330,'FT00002','ML'),

('TR00000002',1,'N','N',100,'FT00003','ML'),
('TR00000002',2,'N','N',100,'FT00005','ML'),
('TR00000002',3,'N','N',125,'FT00004','ML'),
('TR00000002',4,'Y','N',350,'FT00001','ML'),
('TR00000002',5,'N','N',150,'FT00004','ML'),
('TR00000002',6,'Y','Y',330,'FT00002','ML'),

('TR00000003',1,'N','N',75,'FT00003','ML'),
('TR00000003',2,'N','N',80,'FT00003','ML'),
('TR00000003',3,'N','N',80,'FT00004','ML'),
('TR00000003',4,'N','N',75,'FT00005','ML'),
('TR00000003',5,'Y','N',275,'FT00001','ML'),
('TR00000003',6,'N','N',175,'FT00004','ML'),
('TR00000003',7,'Y','Y',330,'FT00002','ML'),

('TR00000004',1,'N','N',60,'FT00003','ML'),
('TR00000004',2,'N','N',90,'FT00003','ML'),
('TR00000004',3,'N','N',90,'FT00003','ML'),
('TR00000004',4,'N','N',60,'FT00005','ML'),
('TR00000004',5,'N','N',210,'FT00004','ML'),
('TR00000004',6,'N','N',210,'FT00004','ML'),
('TR00000004',7,'Y','Y',330,'FT00002','ML')
;


------------------- DIET MANAGEMENT -----------------------
CREATE TABLE diet_mgmt (
    diet_id serial PRIMARY KEY,
    usr_id integer NOT NULL,
	std_cd VARCHAR(10) NOT NULL,
	std_nm VARCHAR(50) NOT NULL,
    diet_nm VARCHAR(50) NOT NULL,
    diet_desc VARCHAR(300),
    diet_fav_flg VARCHAR(1),
	tray_id integer NULL,
	tray_nm VARCHAR(50) NULL,
	rep_tray_cd VARCHAR(10) NULL,
	tray_mand_flg VARCHAR(1),
    cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usr_id) REFERENCES usr_mgmt(usr_id),
	UNIQUE (usr_id, diet_nm)
);

CREATE INDEX xak1diet_mgmt ON diet_mgmt USING btree (usr_id); --to find diet belonging to one user faster

CREATE TABLE diet_std_dtl_mgmt (
    diet_id integer,
    nutr_cd VARCHAR(10),
    nutr_mand_flg VARCHAR(1),
    nutr_wgt_fm NUMERIC(20, 10),
    nutr_wgt_to NUMERIC(20, 10),
    nutr_foml VARCHAR(50),
    cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (diet_id, nutr_cd),
    FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE, 
    FOREIGN KEY (nutr_cd) REFERENCES mst_nutr(nutr_cd) ON DELETE CASCADE 
);


CREATE TABLE diet_tray_dtl_mgmt (
    diet_id INTEGER,
    fd_seq SMALLINT,
    fd_nm varchar(50),
    fd_mand_flg VARCHAR(1),
    fd_sep_flg VARCHAR(1),
    fd_capa_vol SMALLINT NOT NULL,
    fd_tp_cd VARCHAR(10) NOT NULL,
    unit_cd VARCHAR(10) NOT NULL,
    fd_cd VARCHAR(10),
    fd_rcp_desc VARCHAR(5000),
    cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (diet_id, fd_seq),
    FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE, 
    FOREIGN KEY (fd_cd) REFERENCES mst_fd(fd_cd) ON DELETE CASCADE 
);


CREATE TABLE diet_fd_dtl_mgmt (
    diet_id INTEGER,
    fd_seq SMALLINT,
    mat_cd VARCHAR(10),
    mat_rcp_wgt NUMERIC(10, 3),
    mat_calc_wgt NUMERIC(10, 3),
	mat_prc INTEGER,
	rct_incl_flg VARCHAR(1) DEFAULT 'Y',
    cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (diet_id, fd_seq, mat_cd),
    FOREIGN KEY (diet_id, fd_seq) REFERENCES diet_tray_dtl_mgmt(diet_id, fd_seq) ON DELETE CASCADE, 
    FOREIGN KEY (mat_cd) REFERENCES mst_mat(mat_cd) ON DELETE CASCADE 
); 


CREATE TABLE diet_accs (
    diet_id INTEGER,
    accs_seq SMALLINT,
    accs_nm VARCHAR(50),
    accs_prc INTEGER,
	rct_incl_flg VARCHAR(1) DEFAULT 'Y',
    cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (diet_id, accs_seq),
    FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE
);

CREATE TABLE diet_nutr_smry (
	diet_id INTEGER,
	nutr_cd VARCHAR(10),
	nutr_fnl_amt NUMERIC(10, 6),
	cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (diet_id, nutr_cd),
	FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE,
	FOREIGN KEY (nutr_cd) REFERENCES mst_nutr(nutr_cd) ON DELETE CASCADE
);

CREATE TABLE diet_rct (
	rct_id SERIAL PRIMARY KEY,
	diet_id INTEGER NOT NULL UNIQUE,
	unit_prc NUMERIC(20,3),
	serv_qty SMALLINT,
	adj_pct SMALLINT,
	fnl_prc NUMERIC(20,3),
	cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE
);

CREATE TABLE usr_tray_mgmt (
	tray_id SERIAL PRIMARY KEY,
	usr_id INTEGER NOT NULL,
	tray_nm VARCHAR(50) NOT NULL,
	rep_tray_cd VARCHAR(10) NOT NULL,
	tray_mand_flg VARCHAR(1),
	diet_id INTEGER,
	cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (usr_id) REFERENCES usr_mgmt(usr_id) ON DELETE CASCADE,
	FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE
);
CREATE INDEX idx_usr_tray_mgmt_diet_id ON usr_tray_mgmt (diet_id);

CREATE TABLE usr_tray_dtl_mgmt (
	tray_id INTEGER,
	fd_seq SMALLINT,
	fd_mand_flg VARCHAR(1),
	fd_sep_flg VARCHAR(1),
	fd_capa_vol SMALLINT NOT NULL,
	unit_cd VARCHAR(10) NOT NULL,
	fd_tp_cd VARCHAR(10) NOT NULL,
	cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (tray_id, fd_seq),
	FOREIGN KEY (tray_id) REFERENCES usr_tray_mgmt(tray_id) ON DELETE CASCADE
);
