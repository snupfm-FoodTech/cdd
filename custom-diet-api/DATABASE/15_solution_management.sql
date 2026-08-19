-- create table to store all solution types
CREATE TABLE sol_tp_mgmt (
	sol_tp_id serial4 NOT NULL, 
	sol_tp_tit varchar(100) NOT NULL, 
	sol_tp_desc varchar(255),
	sol_tp_tag varchar(100),
	icon_url varchar(2084),
	cre_usr_id int4 NOT NULL,
	cre_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	upd_usr_id int4 NOT NULL,
	upd_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT sol_tp_mgmt_pk PRIMARY KEY (sol_tp_id)
);

-- create table to store all solution contents
CREATE TABLE sol_ctnt_mgmt (
	sol_ctnt_id serial4 NOT NULL,
	sol_tp_id int4 NOT NULL ,
	sol_ctnt_tit varchar(100) NOT NULL,
	sol_ctnt_sub_tit varchar(100) NOT NULL,
	sol_ctnt_tag varchar(100),
	sol_ctnt_desc jsonb,
	icon_url varchar(2084),
	cre_usr_id int4 NOT NULL,
	cre_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	upd_usr_id int4 NOT NULL,
	upd_dt timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT sol_ctnt_mgmt_pk PRIMARY KEY (sol_ctnt_id),
	CONSTRAINT sol_ctnt_mgmt_fk_1 FOREIGN KEY (sol_tp_id) REFERENCES sol_tp_mgmt(sol_tp_id) ON DELETE CASCADE
);

-- insert permission for admin
INSERT INTO perm_mgmt (perm_rsrc, perm_act)
VALUES 
('solutions', 'READ'),
('solutions', 'WRITE'),
('solutions', 'DELETE');

INSERT INTO role_perm_mgmt (role_id, perm_id)
SELECT 1, perm_id 
FROM perm_mgmt
WHERE perm_rsrc = 'solutions';

INSERT INTO sol_tp_mgmt (sol_tp_tit, sol_tp_desc, sol_tp_tag, cre_usr_id, upd_usr_id)
VALUES 
('식이 평가', '사용자의 식습관과 건강 상태를 분석하여 개인 맞춤형 영양 평가를 제공합니다', '3개 알고리즘', 1, 1),
('식이 추천', '개인의 선호도와 건강 상태를 고려하여 최적의 식품과 레시피를 추천합니다', '4개 알고리즘', 1, 1),
('식이 설계', '영양학적 균형과 개인 요구사항을 고려한 맞춤형 식단을 자동으로 설계합니다', '5개 알고리즘', 1, 1),
('식이 교육', '개인 맞춤형 영양 교육과 AI 기반 상담 서비스를 제공합니다', '2개 알고리즘', 1, 1);


INSERT INTO sol_ctnt_mgmt (sol_tp_id, sol_ctnt_tit, sol_ctnt_sub_tit, sol_ctnt_tag, cre_usr_id, upd_usr_id)
VALUES 
(1, '사용자 데이터 분석 기반 니즈 도출', '커뮤니티 데이터를 머신러닝으로 분석하여 사용자의 식품 관련 관심사와 니즈를 자동으로 도출합니다.', '논문 게재', 1, 1),
(1, 'LLM 기반 음식 분류 및 평가', '대규모 언어모델을 활용해 음식을 분류하고 식이 패턴을 평가하여 질환 위험도를 예측합니다.', '특허 출원 완료', 1, 1),
(1, '체중 관리자 맞춤 영양 기준 도출', '개인의 체중 감량 효율을 계산하여 맞춤형 에너지 및 영양소 권장 섭취량을 제공합니다.', '특허 출원 완료', 1, 1),

(2, '음식 선호도 예측 및 레시피 추천', '그래프 신경망으로 음식 선호도를 예측하고 보유 식재료를 고려한 맞춤형 레시피를 추천합니다.', '특허 출원 완료', 1, 1),
(2, '채식 유형별 섭취 가능 식품 필터링', '다양한 채식 유형과 동기를 분석하여 개인에게 적합한 채식 식품을 필터링합니다.', '특허 등록', 1, 1),
(2, '비만 유형별 식품 영양 평가 및 추천', '비만 유형별 맞춤 영양 프로파일링을 통해 개인화된 식품 영양 점수를 제공합니다.', '특허 출원 완료', 1, 1),
(2, '신장 질환 유형별 대체 레시피 추천', 'GNN 모델로 신장 질환자의 식재료 제한사항을 고려한 개인 맞춤 대체 레시피를 생성합니다.', '특허 출원 준비', 1, 1),

(3, '맞춤형 도시락 설계', '다양한 건강 조건과 용기 규격을 고려하여 맞춤형 도시락 메뉴를 자동으로 설계합니다.', '특허 출원 중', 1, 1),
(3, '구독형 식단 임상 실험 설계', '식단 선호도 기반 구독 서비스의 건강 개선 효과를 검증하는 임상 실험을 설계합니다.', '논문 투고 준비', 1, 1),
(3, '식단 가격·영양·다양성 최적화', '유전 알고리즘으로 가격, 영양 균형, 식품 조합, 메뉴 다양성을 동시에 최적화합니다.', '특허 출원 완료', 1, 1),
(3, '고령자 질환 및 저작단계 기반 식단 설계', '고령자의 저작 능력과 질환을 고려한 개인 맞춤 5일치 식단을 자동으로 생성합니다.', '알고리즘 개발중', 1, 1),

(4, '맛 선호도 및 민감도 평가', '개인의 미각 프로필을 과학적으로 분석하여 맞춤형 영양 교육 가이드를 제공합니다.', '실증 완료', 1, 1),
(4, 'RAG 활용 식이 관리 챗봇', '공인된 의료 가이드라인을 기반으로 신장질환자 맞춤형 식이 상담을 제공하는 AI 챗봇입니다.', '특허 출원 준비', 1, 1);
