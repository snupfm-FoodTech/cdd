----------------------------- MASTER DATA FOR INTERGRATED CODE --------------------------------

CREATE TABLE com_intg_cd_hdr (
    intg_cd VARCHAR(20) PRIMARY KEY,
    intg_cd_nm VARCHAR(50) NOT NULL,
    intg_cd_desc VARCHAR(1000) NOT NULL
);

CREATE TABLE com_intg_cd_dtl (
    intg_cd VARCHAR(20),
    intg_cd_val_ctnt VARCHAR(50),
    intg_cd_dp_val_desc VARCHAR (1000) NOT NULL,
    intg_cd_val_desc VARCHAR(1000) NOT NULL,
    intg_cd_val_seq SMALLINT NOT NULL,
    PRIMARY KEY (intg_cd, intg_cd_val_ctnt),
    FOREIGN KEY (intg_cd) REFERENCES com_intg_cd_hdr(intg_cd) ON DELETE CASCADE
);



INSERT INTO com_intg_cd_hdr (intg_cd, intg_cd_nm, intg_cd_desc)
VALUES
	('CD00001', 'User account status code', 'Provides functionalities for locking, unlocking, disabling, and deleting user accounts within the system'),
	('CD00008', 'Knowledge functionality type code', 'Categorizes knowledge into functional groups'),
	('CD00009', 'Company size code', 'Provides list of company sizes'),
	('CD00010', 'Question status code', 'Specify the status of user questions'),
    ('CD00011', 'Knowledge dietary type code', 'Categorizes knowledge into dietary groups'),
    ('CD00012', 'Unit code', 'Categorizes Food into dietary groups'),
    ('CD00013', 'Food type code', 'Categorizes Food into dietary groups'),
	('CD00014', 'Nutrition Standard Type code', 'Categorizes standards into types'),
	('CD00015', 'Representative tray code', 'Define representative image for tray code');

-- A, D: ACCOUNT STATUS FOR ACTIVE AND DELETED
INSERT INTO com_intg_cd_dtl (intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq)
VALUES 
	('CD00001', 'A', '활성화', '사용자 계정 상태가 활성화되어 API에 접근할 수 있습니다', 1),
	('CD00001', 'D', '삭제됨', '사용자 계정 상태가 삭제되어 API에 접근할 수 없습니다', 2);

-- Insert for knowledge function categories from table tmpl_kwlg_func_tp (CLIENT)
INSERT INTO com_intg_cd_dtl (intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq)
VALUES 
	('CD00008','FC001','감각계','감각계',1),
	('CD00008','FC002','근육계','근육계',2),
	('CD00008','FC003','기타','기타',3),
	('CD00008','FC004','내분비계','내분비계',4),
	('CD00008','FC005','비뇨계','비뇨계',5),
	('CD00008','FC006','생식계','생식계',6),
	('CD00008','FC007','소화/대사계','소화/대사계',7),
	('CD00008','FC008','신경계','신경계',8),
	('CD00008','FC009','신체방어 및 면역계','신체방어 및 면역계',9),
	('CD00008','FC010','심혈관계','심혈관계',10);

-- COMPANY SIZE
INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
)
VALUES 
    ('CD00009', 'CS001', '대기업', '주요 다국적 기업을 포함한 대기업', 1),
    ('CD00009', 'CS002', '비영리단체', '자선단체 및 비정부기구를 포함한 비영리단체', 2),
    ('CD00009', 'CS003', '중견기업', '중간 규모의 기업', 3),
    ('CD00009', 'CS004', '중소기업', '중소기업 및 스타트업을 포함한 중소기업', 4);




-- USER QUESTION STATUS => O: OPEN ; C: CLOSED
INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
)
VALUES 
    ('CD00010', 'O', '답변 전', '현재 질문이 열려 있습니다', 1),
    ('CD00010', 'C', '답변 완료', '질문이 닫히거나 해결되었습니다', 2);



-- Insert for knowledge diet categories from table tmpl_kwlg_diet_tp (CLIENT)
INSERT INTO com_intg_cd_dtl (intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq)
VALUES
	('CD00011','DC001','기타','기타',1),
	('CD00011','DC002','보충제','보충제',2),
	('CD00011','DC003','비타민','비타민',3),
	('CD00011','DC004','식단','식단',4),
	('CD00011','DC005','식습관','식습관',5),
	('CD00011','DC006','식품','식품',6),
	('CD00011','DC007','영양소','영양소',7);


-- Insert for unit code from table mst_unit (CLIENT)
INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
) VALUES 
    ('CD00012','KCAL','kcal','kcal',1),
    ('CD00012','GAM','g','g',2),
    ('CD00012','MLGAM','mg','mg',3),
    ('CD00012','MCGAM_REA','μg RAE','μg RAE',4),
    ('CD00012','MCGAM','μg','μg',5),
    ('CD00012','ML','ml','ml',6);


-- Insert for food type code (CD00013)
INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
) VALUES 
    ('CD00013', 'FT00001', '밥/죽/면', '밥/죽/면', 1),
    ('CD00013', 'FT00002', '국/탕', '국/탕', 2),
    ('CD00013', 'FT00003', '채소류 반찬', '채소류 반찬', 3),
    ('CD00013', 'FT00004', '단백질 반찬', '단백질 반찬', 4),
    ('CD00013', 'FT00005', '김치류 반찬', '김치류 반찬', 5),
    ('CD00013', 'FT00006', '기타 반찬', '기타 반찬', 6);

-- INSERT NUTRITION STANDARD TYPE CODE
INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
) VALUES 
    ('CD00014', 'A', '질환관리식', '질환관리식 - Disease Management Diet', 1),
	('CD00014', 'B', '건강관리식', '건강관리식 - Health Management Diet', 2);

-- INSERT representative tray code
INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
) VALUES 
    ('CD00015', 'A', '서울포장, M-1825-4A', '밥/죽/면 포함, 국/탕 비포함, 반찬 3개', 1),
	('CD00015', 'B', '서울포장, GP-15-5A', '밥/죽/면 포함, 국/탕 비포함, 반찬 4개', 2),
	('CD00015', 'C', '대흥포장, TY-1006', '밥/죽/면 포함, 국/탕 비포함, 반찬 5개', 3),
	('CD00015', 'D', '대흥포장, JB-113', '밥/죽/면 비포함, 국/탕 비포함, 반찬 6개', 4);


CREATE TABLE usr_mgmt (
    usr_id SERIAL PRIMARY KEY,
    usr_eml VARCHAR(255) NOT NULL,
    usr_pwd VARCHAR(100) NOT NULL,
    usr_nm VARCHAR(50) NOT NULL,
    usr_phn_no VARCHAR(50),
    usr_lst_log_dt TIMESTAMP,
    usr_acct_sts_cd VARCHAR(10) NOT NULL,
    cre_usr_id INTEGER NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id INTEGER NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_mgmt (
    role_id SMALLSERIAL PRIMARY KEY,
    role_cd VARCHAR(20) NOT NULL UNIQUE,
    role_desc VARCHAR(100)
);

CREATE TABLE perm_mgmt (
    perm_id SMALLSERIAL PRIMARY KEY,
    perm_rsrc VARCHAR(100) NOT NULL,
    perm_act VARCHAR(100) NOT NULL
);

CREATE TABLE usr_role_mgmt (
    usr_id INTEGER,
    role_id SMALLINT,
	cre_usr_id INTEGER NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id INTEGER NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usr_id, role_id),
    FOREIGN KEY (usr_id) REFERENCES usr_mgmt (usr_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role_mgmt (role_id) ON DELETE CASCADE
);

CREATE TABLE role_perm_mgmt (
    role_id SMALLINT,
    perm_id SMALLINT,
    PRIMARY KEY (role_id, perm_id),
    FOREIGN KEY (role_id) REFERENCES role_mgmt (role_id) ON DELETE CASCADE,
    FOREIGN KEY (perm_id) REFERENCES perm_mgmt (perm_id) ON DELETE CASCADE
);


--INSERT ROLES
INSERT INTO role_mgmt (role_cd, role_desc)
VALUES 
('ADM', '관리자 역할'),
('MEM', '회원 역할');


--INSERT PERMISSIONS
INSERT INTO perm_mgmt (perm_rsrc, perm_act)
VALUES 
('users', 'READ'),
('users', 'WRITE'),
('users', 'DELETE'),
('companies', 'READ'),
('companies', 'WRITE'),
('companies', 'DELETE'),
('faqs', 'READ'),
('faqs', 'WRITE'),
('faqs', 'DELETE'),
('notices', 'READ'),
('notices', 'WRITE'),
('notices', 'DELETE'),
('knowledges', 'READ'),
('knowledges', 'WRITE'),
('knowledges', 'DELETE'),
('user-questions', 'READ'),
('user-questions', 'WRITE'),
('user-questions', 'DELETE'),
('files', 'READ'),
('files', 'WRITE'),
('files', 'DELETE'),
('diets', 'READ'),
('diets', 'WRITE'),
('diets', 'DELETE')
;


--ADD PERMISSIONS TO ROLE
--ADD PERMISSION TO ADMIN ROLE
INSERT INTO role_perm_mgmt (role_id, perm_id)
SELECT a.role_id, perm_id
FROM role_mgmt a
INNER JOIN perm_mgmt b ON 1=1
WHERE a.role_cd = 'ADM';

--ADD PERMISSION TO MEMBER ROLE
INSERT INTO role_perm_mgmt (role_id, perm_id)
SELECT a.role_id, perm_id
FROM role_mgmt a
INNER JOIN perm_mgmt b ON (
	(
		b.perm_rsrc = 'users'
		AND b.perm_act = 'READ'
	)
	OR 
	(
		b.perm_rsrc = 'companies'
		AND b.perm_act = 'READ'
	)
	OR 
	(
		b.perm_rsrc = 'faqs'
		AND b.perm_act = 'READ'
	)
	OR 
	(
		b.perm_rsrc = 'notices'
		AND b.perm_act = 'READ'
	)
	OR 
	(
		b.perm_rsrc = 'knowledges'
		AND b.perm_act = 'READ'
	)
	OR 
	(
		b.perm_rsrc = 'user-questions'
		AND b.perm_act IN ('READ', 'WRITE', 'DELETE')
	)
    OR 
	(
		b.perm_rsrc = 'files'
		AND b.perm_act IN ('READ', 'WRITE')
	)
    OR 
	(
		b.perm_rsrc = 'diets'
		AND b.perm_act IN ('READ', 'WRITE', 'DELETE')
	)
)
WHERE a.role_cd = 'MEM';

------------------------------ QUESTIONS ---------------------------------------
CREATE TABLE que_mgmt (
    que_id SERIAL PRIMARY KEY,
    que_sts_cd VARCHAR(10) NOT NULL,
    que_usr_id INTEGER NOT NULL,
    que_tit VARCHAR(200) NOT NULL,
    que_ctnt VARCHAR(2000) NOT NULL,
    ans_usr_id INTEGER,
    ans_ctnt VARCHAR(2000),
    que_atch_url VARCHAR(2084),
    cre_usr_id INTEGER NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id INTEGER NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (que_usr_id) REFERENCES usr_mgmt (usr_id),
    FOREIGN KEY (ans_usr_id) REFERENCES usr_mgmt (usr_id)
);

---------------------------------------- FAQ ------------------------------------------
CREATE TABLE faq_mgmt (
    faq_id serial PRIMARY KEY,
    faq_que_ctnt VARCHAR(2000) NOT NULL,
    faq_ans_ctnt VARCHAR(2000) NOT NULL,
    cre_usr_id INTEGER NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id INTEGER NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------- NOTICE ---------------------------------
CREATE TABLE ntc_mgmt (
    ntc_id serial PRIMARY KEY,
    ntc_tit VARCHAR(100) NOT NULL,
    ntc_ctnt VARCHAR(5000) NOT NULL,
    ntc_atch_url VARCHAR(2084),
    cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
