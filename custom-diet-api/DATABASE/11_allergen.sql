-- create table for user food management
CREATE TABLE usr_fd_mgmt (
	usr_id int4 NOT NULL,
	fd_cd varchar(10) NOT NULL,
	fd_rcp_desc varchar(5000),
    fd_nm varchar(50) NOT NULL,
	cre_usr_id int4 NOT NULL,
	cre_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	upd_usr_id int4 NOT NULL,
	upd_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT usr_fd_mgmt_pkey PRIMARY KEY (usr_id, fd_cd),
	CONSTRAINT usr_fd_mgmt_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES usr_mgmt(usr_id) ON DELETE CASCADE,
	CONSTRAINT usr_fd_mgmt_fd_cd_fkey FOREIGN KEY (fd_cd) REFERENCES mst_fd(fd_cd) ON DELETE CASCADE
);

-- create master data for allergen
CREATE TABLE mst_alrg (
	alrg_id serial NOT NULL,
	alrg_nm varchar(50) NOT NULL,
	CONSTRAINT mst_alrg_pkey PRIMARY KEY (alrg_id)
);

INSERT INTO mst_alrg (alrg_nm)
VALUES 
('게'),
('고등어'),
('굴'),
('난류(가금류)'),
('닭고기'),
('대두'),
('돼지고기'),
('땅콩'),
('메밀'),
('밀'),
('복숭아'),
('새우'),
('쇠고기'),
('오징어'),
('우유'),
('전복'),
('조개류'),
('토마토'),
('호두'),
('홍합'),
('아황산 포함 식품');

-- create relationship between material and allergen
CREATE TABLE tmpl_mat_alrg (
	mat_cd varchar(10) NOT NULL,
	alrg_id int4 NOT NULL,
	CONSTRAINT tmpl_mat_alrg_pkey PRIMARY KEY (mat_cd, alrg_id),
	CONSTRAINT tmpl_mat_alrg_alrg_id_fkey FOREIGN KEY (alrg_id) REFERENCES mst_alrg(alrg_id) ON DELETE SET NULL,
	CONSTRAINT tmpl_mat_alrg_mat_cd_fkey FOREIGN KEY (mat_cd) REFERENCES mst_mat(mat_cd) ON DELETE SET NULL
);

-- create for diet allergen management
CREATE TABLE diet_alrg_mgmt (
	diet_id int4 NOT NULL,
	alrg_id int2 NOT NULL,
	cre_usr_id int4 NOT NULL,
	cre_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	upd_usr_id int4 NOT NULL,
	upd_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT diet_alrg_mgmt_pkey PRIMARY KEY (diet_id, alrg_id),
	CONSTRAINT diet_alrg_mgmt_alrg_id_fkey FOREIGN KEY (alrg_id) REFERENCES mst_alrg(alrg_id) ON DELETE CASCADE,
	CONSTRAINT diet_alrg_mgmt_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES diet_mgmt(diet_id) ON DELETE CASCADE
);