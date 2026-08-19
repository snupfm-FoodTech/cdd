-- add master data for corporate solution consulting
-- This script inserts master data for corporate solution consulting into the com_intg_cd_hdr and com_intg_cd_dtl tables
INSERT INTO com_intg_cd_hdr (intg_cd, intg_cd_nm, intg_cd_desc) 
VALUES 
('CD00016', 'Food Tech Field', 'Classification of sectors within the food technology industry'),
('CD00017', 'Company Address', 'Administrative region where the company is located (e.g., city or province)'),
('CD00018', 'Solution Type', 'Types of personalized dietary services offered based on user needs'),
('CD00019', 'Solution Target', 'Target audience or user groups for dietary solutions');

INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
)
VALUES 
('CD00016', '01', '세포배양식품', '세포배양식품', 1),
('CD00016', '02', '식물기반식품', '식물기반식품', 2),
('CD00016', '03', '간편식 제조', '간편식 제조', 3),
('CD00016', '04', '식품프린팅', '식품프린팅', 4),
('CD00016', '05', '식품 스마트 제조', '식품 스마트 제조', 5),
('CD00016', '06', '식품 스마트 유통', '식품 스마트 유통', 6),
('CD00016', '07', '식품 커스터마이징', '식품 커스터마이징', 7),
('CD00016', '08', '외식 푸드테크', '외식 푸드테크', 8),
('CD00016', '09', '식품 업사이클링', '식품 업사이클링', 9),
('CD00016', '10', '친환경식품 포장', '친환경식품 포장', 10);

INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
)
VALUES 
('CD00017', '01', '서울특별시', '서울특별시', 1),
('CD00017', '02', '부산광역시', '부산광역시', 2),
('CD00017', '03', '대구광역시', '대구광역시', 3),
('CD00017', '04', '인천광역시', '인천광역시', 4),
('CD00017', '05', '광주광역시', '광주광역시', 5),
('CD00017', '06', '대전광역시', '대전광역시', 6),
('CD00017', '07', '울산광역시', '울산광역시', 7),
('CD00017', '08', '세종특별자치시', '세종특별자치시', 8),
('CD00017', '09', '경기도', '경기도', 9),
('CD00017', '10', '강원도', '강원도', 10),
('CD00017', '11', '충청북도', '충청북도', 11),
('CD00017', '12', '충청남도', '충청남도', 12),
('CD00017', '13', '전라북도', '전라북도', 13),
('CD00017', '14', '전라남도', '전라남도', 14),
('CD00017', '15', '경상북도', '경상북도', 15),
('CD00017', '16', '경상남도', '경상남도', 16),
('CD00017', '17', '제주특별자치도', '제주특별자치도', 17);

INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
)
VALUES
('CD00018', '01', '식이 평가/진단', '개인 맞춤 식사 데이터 분석을 통해 건강 상태와 식단 수준 평가 제공', 1),
('CD00018', '02', '식이 추천',    '개인 맞춤 식품·레시피·식단 추천으로 실생활 적용도 높은 식이 솔루션 제공', 2),
('CD00018', '03', '식이 설계',    '개인 맞춤 건강 목표와 선호에 따른 자동 식단 설계 및 구성 지원',           3),
('CD00018', '04', '식이 코칭',    '개인 맞춤 식이 교육 및 챗봇 상담으로 지속 가능한 식습관 형성 지원',         4),
('CD00018', '05', '기타',    '기타 맞춤형 솔루션',         5);

INSERT INTO com_intg_cd_dtl (
    intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq
)
VALUES
('CD00019', '01', '일반인', '건강한 성인 등', 1),
('CD00019', '02', '고령자', '55세 이상 중장년층', 2),
('CD00019', '03', '질환자', '당뇨, 신장질환 등', 3),
('CD00019', '04', '비건',   '채식주의 식단 선호자', 4),
('CD00019', '05', '기타',   '기타 특정 대상', 5);

-- Create table for corporate solution consulting requests
CREATE TABLE csul_req_mgmt (
	id serial4, -- request ID
	fd_tec_id varchar(50) NOT NULL, -- food tech id
	co_nm varchar(100) NOT NULL, -- company name
	co_biz_no varchar(50) NOT NULL, -- company business number
	co_addr_id varchar(50) NOT NULL, -- company address ID 
	sndr_nm varchar(100) NOT NULL, -- sender name
	sndr_phn_no varchar(50) NOT NULL, -- sender phone number
	sndr_eml varchar(255) NOT NULL, -- sender email
	sol_tp_ids varchar(50)[] NOT NULL, -- solution type ids
	sol_tgt_ids varchar(50)[] NOT NULL, -- solution target ids
	sol_dtl varchar(5000) NOT NULL, -- solution details
	cre_usr_id int4 NOT NULL,
	cre_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	upd_usr_id int4 NOT NULL,
	upd_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT csul_req_mgmt_pkey PRIMARY KEY (id)
);

-- Add comments for the columns in csul_req_mgmt table
COMMENT ON COLUMN csul_req_mgmt.fd_tec_id IS 'CD00016';
COMMENT ON COLUMN csul_req_mgmt.co_addr_id IS 'CD00017';
COMMENT ON COLUMN csul_req_mgmt.sol_tp_ids IS 'CD00018';
COMMENT ON COLUMN csul_req_mgmt.sol_tgt_ids IS 'CD00019';

-- insert permission for admin
INSERT INTO perm_mgmt (perm_rsrc, perm_act)
VALUES 
('consult-requests', 'READ'),
('consult-requests', 'WRITE'),
('consult-requests', 'DELETE');

INSERT INTO role_perm_mgmt (role_id, perm_id)
SELECT 1, perm_id
FROM perm_mgmt
WHERE perm_rsrc = 'consult-requests';

-- Migration: Add '기타' to CD00016 (Food Tech Field)
INSERT INTO com_intg_cd_dtl (intg_cd, intg_cd_val_ctnt, intg_cd_dp_val_desc, intg_cd_val_desc, intg_cd_val_seq)
VALUES ('CD00016', '11', '기타', '기타', 11)
ON CONFLICT DO NOTHING;

-- Migration: Add solution title column to csul_req_mgmt
ALTER TABLE csul_req_mgmt ADD COLUMN sol_title varchar(50) NOT NULL DEFAULT '';
ALTER TABLE csul_req_mgmt ALTER COLUMN sol_title DROP DEFAULT;