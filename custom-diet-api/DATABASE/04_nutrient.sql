-------------- NUTRITION -----------------
CREATE TABLE mst_nutr (
    nutr_cd VARCHAR(10) PRIMARY KEY,
    nutr_nm VARCHAR(50) NOT NULL,
    unit_cd VARCHAR(10) NOT NULL
);

--client data
INSERT INTO mst_nutr (nutr_cd, nutr_nm, unit_cd) VALUES
('ENG','에너지','KCAL'),
('MOIS','수분','GAM'),
('PROTEIN','단백질','GAM'),
('FAT','지방','GAM'),
('ASH','회분','GAM'),
('CHO','탄수화물','GAM'),
('SUGAR','당류','GAM'),
('FIBER','식이섬유','GAM'),
('CA','칼슘','MLGAM'),
('FE','철','MLGAM'),
('P','인','MLGAM'),
('K','칼륨','MLGAM'),
('NA','나트륨','MLGAM'),
('VITA','비타민 A','MCGAM_REA'),
('RETI','레티놀','MCGAM'),
('CARO','베타카로틴','MCGAM'),
('THIA','티아민','MLGAM'),
('RIBO','리보플라빈','MLGAM'),
('NIACIN','니아신','MLGAM'),
('VITC','비타민 C','MLGAM'),
('VITD','비타민 D','MCGAM'),
('CHOLE','콜레스테롤','MLGAM'),
('SFA','포화지방산','GAM'),
('TRANS','트랜스지방산','GAM');