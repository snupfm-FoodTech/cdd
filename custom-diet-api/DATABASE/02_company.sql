------------------------------ COMPANY ------------------------------

CREATE TABLE co_tp_mgmt (
    co_tp_id SMALLSERIAL PRIMARY KEY,
    co_tp_nm VARCHAR(50) NOT NULL
);

CREATE TABLE co_mgmt (
	co_id serial PRIMARY KEY,
	co_tp_id SMALLINT,
	co_nm VARCHAR(100) NOT NULL,
	co_eng_nm VARCHAR(100),
	co_biz_no VARCHAR(50), 
	co_no VARCHAR(50),
	co_rep_nm VARCHAR(100),
	co_ttl_emp_no INTEGER,
	co_est_fom VARCHAR(50),
	co_est_dt TIMESTAMP,
	co_fom VARCHAR(50),
	co_phn_no VARCHAR(50),
	co_sz_cd VARCHAR(10),
	co_pals_no VARCHAR(50),
	co_addr VARCHAR(200),
	co_eml VARCHAR(255),
	co_hpg_url VARCHAR(2084),
	co_indus VARCHAR(200),
	co_img_url VARCHAR(2084),
	co_view_qty INTEGER DEFAULT 0,
	cre_usr_id INTEGER NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id INTEGER NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (co_tp_id) REFERENCES co_tp_mgmt(co_tp_id) ON DELETE SET NULL
);


INSERT INTO co_tp_mgmt (co_tp_nm) VALUES
('DX/AI'),
('로보틱스'),
('메디푸드/개인맞춤'),
('ESG'),
('소비'),
('유통'),
('생산'),
('홍보/투자'),
('연구개발'),
('기타');
