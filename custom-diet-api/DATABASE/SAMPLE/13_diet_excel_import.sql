-- Auto-generated from "# 식단_241114.xlsx" (엑셀 임포트)
-- mat_cd는 06_mst_mat.sql 삽입 순서 기반 위치 매핑으로 계산됨 (검증됨)

INSERT INTO mst_fd (fd_cd, fd_nm, fd_tp_cd) VALUES
    ('FD00014718','병아리콩현미밥','FT00001'),
    ('FD00014719','표고버섯부추볶음','FT00003'),
    ('FD00014720','상추무침','FT00003'),
    ('FD00014721','건포도단호박샐러드','FT00003'),
    ('FD00014722','완두콩현미밥','FT00001'),
    ('FD00014723','기장현미밥','FT00001'),
    ('FD00014724','차조현미밥','FT00001'),
    ('FD00014725','흑미현미밥','FT00001'),
    ('FD00014726','양상추','FT00003'),
    ('FD00014727','연근','FT00003'),
    ('FD00014728','와사비장','FT00006'),
    ('FD00014729','고추','FT00003'),
    ('FD00014730','케일','FT00003'),
    ('FD00014731','브로콜리','FT00003'),
    ('FD00014732','연두부','FT00004'),
    ('FD00014733','카레라이스','FT00001'),
    ('FD00014734','양배추','FT00003'),
    ('FD00014735','온두부','FT00004');

INSERT INTO tmpl_fd (tmpl_fd_cd, tmpl_mat_cd, tmpl_mat_rcp_wgt, tmpl_mat_calc_wgt) VALUES
    ('FD00014718','MT00012683',5,5),
    ('FD00014718','MT00010145',60,60),
    ('FD00014719','MT00018536',0.3,0.3),
    ('FD00014719','MT00028924',2,2),
    ('FD00014719','MT00017935',1,0.5),
    ('FD00014719','MT00032386',3.5,4),
    ('FD00014719','MT00029629',4,4),
    ('FD00014719','MT00012978',20,20),
    ('FD00014719','MT00033884',40,40),
    ('FD00014720','MT00018227',0.5,0.5),
    ('FD00014720','MT00029314',0.5,0.5),
    ('FD00014720','MT00029207',1,1),
    ('FD00014720','MT00000313',1,1),
    ('FD00014720','MT00001379',2,2),
    ('FD00014720','MT00009018',2,2),
    ('FD00014720','MT00033254',3,3),
    ('FD00014720','MT00006018',5,10),
    ('FD00014720','MT00023327',10,10),
    ('FD00014720','MT00016154',15,15),
    ('FD00014721','MT00010463',1.5,1.5),
    ('FD00014721','MT00033804',2,2),
    ('FD00014721','MT00009082',7,7),
    ('FD00014721','MT00034941',40,40),
    ('FD00014722','MT00024591',5,5),
    ('FD00014722','MT00010145',65,65),
    ('FD00014723','MT00003056',5,5),
    ('FD00014723','MT00010145',60,60),
    ('FD00014724','MT00027708',5,5),
    ('FD00014724','MT00010145',60,60),
    ('FD00014725','MT00010196',5,5),
    ('FD00014725','MT00010145',60,60),
    ('FD00014726','MT00031039',5,5),
    ('FD00014726','MT00016160',25,25),
    ('FD00014727','MT00031039',10,10),
    ('FD00014727','MT00023935',25,25),
    ('FD00014728','MT00018531',0.1,0.1),
    ('FD00014728','MT00032386',3,3),
    ('FD00014728','MT00005139',20,20),
    ('FD00014728','MT00003557',1,1),
    ('FD00014729','MT00035238',5,5),
    ('FD00014729','MT00008118',10,10),
    ('FD00014729','MT00016154',20,20),
    ('FD00014729','MT00001167',30,30),
    ('FD00014730','MT00035238',5,5),
    ('FD00014730','MT00003045',20,20),
    ('FD00014730','MT00032050',20,20),
    ('FD00014731','MT00035302',5,5),
    ('FD00014731','MT00013466',50,50),
    ('FD00014732','MT00028924',0.5,1),
    ('FD00014732','MT00009018',1,0.3),
    ('FD00014732','MT00033254',1,0.3),
    ('FD00014732','MT00007657',30,30),
    ('FD00014733','MT00010139',75,75),
    ('FD00014733','MT00032386',2,2),
    ('FD00014733','MT00003595',8,8),
    ('FD00014733','MT00000409',10,10),
    ('FD00014733','MT00006018',15,15),
    ('FD00014733','MT00023327',15,15),
    ('FD00014734','MT00023305',40,40),
    ('FD00014735','MT00029314',0.5,0.5),
    ('FD00014735','MT00001379',1,1),
    ('FD00014735','MT00028924',3,3),
    ('FD00014735','MT00007540',60,60);

-- 12_mst_fd_nutr_init.sql은 이 파일보다 먼저 실행되어 신규 음식의 mst_fd_nutr이 비어있으므로,
-- 같은 계산 로직을 신규 fd_cd에 한해 재실행한다 (TRUNCATE 없음).
INSERT INTO mst_fd_nutr (fd_cd, fd_tp_cd, ttl_rcp_wgt, ttl_calc_wgt, eng,
                         protein, fat, cho, sugar, fiber, ca, fe, p, k, na, vita, reti, caro, thia, ribo, niacin, vitc, chole,
                         sfa, trans, mois, ash, vitd, sugar_calc_wgt_rto, na_calc_wgt_rto, eng_calc_wgt_rto, protein_eng_rto,
                         alrg_ids)
SELECT
    fd_cd,
    fd_tp_cd,
    COALESCE(sum(tmpl_mat_rcp_wgt), 0) AS ttl_rcp_wgt,
    COALESCE(sum(tmpl_mat_calc_wgt), 0) AS ttl_calc_wgt,
    sum(eng) AS eng,
    sum(protein) AS protein,
    sum(fat) AS fat,
    sum(cho) AS cho,
    sum(sugar) AS sugar,
    sum(fiber) AS fiber,
    sum(ca) AS ca,
    sum(fe) AS fe,
    sum(p) AS p,
    sum(k) AS k,
    sum(na) AS na,
    sum(vita) AS vita,
    sum(reti) AS reti,
    sum(caro) AS caro,
    sum(thia) AS thia,
    sum(ribo) AS ribo,
    sum(niacin) AS niacin,
    sum(vitc) AS vitc,
    sum(chole) AS chole,
    sum(sfa) AS sfa,
    sum(trans) AS trans,
    sum(mois) AS mois,
    sum(ash) AS ash,
    sum(vitd) AS vitd,
    sum(sugar)/(
        CASE WHEN sum(tmpl_mat_calc_wgt) = 0 THEN NULL ELSE sum(tmpl_mat_calc_wgt) END
        ) AS sugar_calc_wgt_rto,
    sum(na)/(
        CASE WHEN sum(tmpl_mat_calc_wgt) = 0 THEN NULL ELSE sum(tmpl_mat_calc_wgt) END
        ) AS na_calc_wgt_rto,
    sum(eng)/(
        CASE WHEN sum(tmpl_mat_calc_wgt) = 0 THEN NULL ELSE sum(tmpl_mat_calc_wgt) END
        ) AS eng_calc_wgt_rto,
    sum(protein)/(
        CASE WHEN sum(eng) = 0 THEN NULL ELSE sum(eng) END
        ) AS protein_eng_rto,
    (
        SELECT ARRAY_AGG(DISTINCT matalrg.alrg_id ORDER BY matalrg.alrg_id)
        FROM mst_fd fd
                 INNER JOIN tmpl_fd tmplfd ON fd.fd_cd = tmplfd.tmpl_fd_cd
                 INNER JOIN tmpl_mat_alrg matalrg ON tmplfd.tmpl_mat_cd = matalrg.mat_cd
        WHERE fd.fd_cd = sub1.fd_cd
    ) AS alrg_ids
FROM
    (
        SELECT
            fd.fd_cd,
            fd.fd_tp_cd,
            tmplfd.tmpl_mat_rcp_wgt,
            tmplfd.tmpl_mat_calc_wgt,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'ENG' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS eng,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'PROTEIN' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS protein,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'FAT' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS fat,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'CHO' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS cho,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'SUGAR' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS sugar,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'FIBER' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS fiber,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'CA' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS ca,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'FE' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS fe,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'P' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS p,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'K' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS k,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'NA' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS na,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'VITA' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS vita,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'RETI' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS reti,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'CARO' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS caro,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'THIA' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS thia,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'RIBO' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS ribo,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'NIACIN' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS niacin,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'VITC' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS vitc,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'CHOLE' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS chole,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'SFA' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS sfa,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'TRANS' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS trans,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'MOIS' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS mois,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'ASH' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS ash,
            sum(
                    CASE
                        WHEN tmplmat.tmpl_nutr_cd = 'VITD' THEN tmplfd.tmpl_mat_calc_wgt * tmplmat.tmpl_nutr_amt / tmplmat.tmpl_mat_wgt
                        ELSE 0
                        END
            ) AS vitd
        FROM
            mst_fd fd
                LEFT OUTER JOIN tmpl_fd tmplfd ON fd.fd_cd = tmplfd.tmpl_fd_cd
                LEFT OUTER JOIN tmpl_mat tmplmat ON tmplfd.tmpl_mat_cd = tmplmat.tmpl_mat_cd
        WHERE fd.fd_cd IN ('FD00014718','FD00014719','FD00014720','FD00014721','FD00014722','FD00014723','FD00014724','FD00014725','FD00014726','FD00014727','FD00014728','FD00014729','FD00014730','FD00014731','FD00014732','FD00014733','FD00014734','FD00014735')
        GROUP BY
            fd.fd_cd,
            tmplfd.tmpl_mat_cd,
            tmplfd.tmpl_mat_rcp_wgt,
            tmplfd.tmpl_mat_calc_wgt
    ) sub1
GROUP BY
    fd_cd,
    fd_tp_cd
;

-- diet_mgmt / diet_std_dtl_mgmt / diet_tray_dtl_mgmt: 트랜잭션 내에서 INSERT...RETURNING으로 diet_id를 안전하게 확보
DO $$
DECLARE
    v_diet_id INTEGER;
BEGIN
    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨4찬A', '엑셀 임포트 (당뇨4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '표고버섯부추볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014719', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '상추무침', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00014720', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '주꾸미천사채볶음', 'N', 'N', 142, 'FT00004', 'GAM', 'FD00014617', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석4찬A', '엑셀 임포트 (신장4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)두부까스+소스', 'N', 'N', 115, 'FT00004', 'GAM', 'FD00014644', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)참나물무침', 'N', 'N', 42, 'FT00003', 'GAM', 'FD00014645', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)콜리플라워볶음', 'N', 'N', 65, 'FT00003', 'GAM', 'FD00014646', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '어묵국', 'Y', 'Y', 68, 'FT00002', 'GAM', 'FD00005346', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암4찬A', '엑셀 임포트 (암4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '바지락뭇국', 'Y', 'Y', 102, 'FT00002', 'GAM', 'FD00005298', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '콩나물닭갈비', 'N', 'N', 169, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '표고버섯부추볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014719', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '견과류콩조림', 'N', 'N', 39, 'FT00004', 'GAM', 'FD00011781', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압4찬A', '엑셀 임포트 (신장4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)두부까스+소스', 'N', 'N', 115, 'FT00004', 'GAM', 'FD00014644', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)참나물무침', 'N', 'N', 42, 'FT00003', 'GAM', 'FD00014645', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)콜리플라워볶음', 'N', 'N', 65, 'FT00003', 'GAM', 'FD00014646', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '어묵국', 'Y', 'Y', 68, 'FT00002', 'GAM', 'FD00005346', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만4찬A', '엑셀 임포트 (비만4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '냉이된장무침', 'N', 'N', 64, 'FT00003', 'GAM', 'FD00012212', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '서리태콩밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000022', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '소고기된장찌개', 'Y', 'Y', 66, 'FT00002', 'GAM', 'FD00006671', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '콩나물무침', 'N', 'N', 39, 'FT00003', 'GAM', 'FD00012299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '호박전', 'N', 'N', 46, 'FT00003', 'GAM', 'FD00008984', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당4찬A', '엑셀 임포트 (당뇨4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '표고버섯부추볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014719', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '상추무침', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00014720', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '주꾸미천사채볶음', 'N', 'N', 142, 'FT00004', 'GAM', 'FD00014617', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염4찬A', '엑셀 임포트 (저염4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)임연수구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014682', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '들깨취나물볶음', 'N', 'N', 79, 'FT00003', 'GAM', 'FD00010628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '참나물무침', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00012411', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백4찬A', '엑셀 임포트 (고단백4찬A)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '보리새우미역국', 'Y', 'Y', 10, 'FT00002', 'GAM', 'FD00014620', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)돼지고기간장불고기', 'N', 'N', 103, 'FT00004', 'GAM', 'FD00014657', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '파래무침', 'N', 'N', 74, 'FT00003', 'GAM', 'FD00012578', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨4찬B', '엑셀 임포트 (당뇨4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치찌개', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00006765', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '닭볶음탕', 'N', 'N', 168, 'FT00004', 'GAM', 'FD00011581', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '비름나물된장무침', 'N', 'N', 84, 'FT00003', 'GAM', 'FD00012250', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '새송이버섯가지볶음', 'N', 'N', 85, 'FT00003', 'GAM', 'FD00010779', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석4찬B', '엑셀 임포트 (신장4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가지볶음', 'N', 'N', 77, 'FT00003', 'GAM', 'FD00014647', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)맑은닭개장', 'Y', 'Y', 142, 'FT00002', 'GAM', 'FD00014648', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)메밀전병', 'N', 'N', 68, 'FT00006', 'GAM', 'FD00014649', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)세발나물무침', 'N', 'N', 46, 'FT00003', 'GAM', 'FD00014650', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암4찬B', '엑셀 임포트 (암4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '육개장', 'Y', 'Y', 77, 'FT00002', 'GAM', 'FD00005528', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '닭볶음탕', 'N', 'N', 168, 'FT00004', 'GAM', 'FD00011581', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '두부부침', 'N', 'N', 83, 'FT00004', 'GAM', 'FD00009038', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압4찬B', '엑셀 임포트 (신장4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가지볶음', 'N', 'N', 77, 'FT00003', 'GAM', 'FD00014647', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)맑은닭개장', 'Y', 'Y', 142, 'FT00002', 'GAM', 'FD00014648', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)메밀전병', 'N', 'N', 68, 'FT00006', 'GAM', 'FD00014649', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)세발나물무침', 'N', 'N', 46, 'FT00003', 'GAM', 'FD00014650', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만4찬B', '엑셀 임포트 (비만4찬B_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '감자볶음', 'N', 'N', 44, 'FT00003', 'GAM', 'FD00011093', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '곤드레나물밥', 'N', 'N', 84, 'FT00001', 'GAM', 'FD00000531', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '미역초무침', 'N', 'N', 43, 'FT00003', 'GAM', 'FD00012572', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '치커리', 'N', 'N', 156, 'FT00006', 'GAM', 'FD00014693', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '시금치된장국', 'Y', 'Y', 30, 'FT00002', 'GAM', 'FD00004898', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당4찬B', '엑셀 임포트 (당뇨4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치찌개', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00006765', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '닭볶음탕', 'N', 'N', 168, 'FT00004', 'GAM', 'FD00011581', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '비름나물된장무침', 'N', 'N', 84, 'FT00003', 'GAM', 'FD00012250', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '새송이버섯가지볶음', 'N', 'N', 85, 'FT00003', 'GAM', 'FD00010779', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염4찬B', '엑셀 임포트 (저염4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '미역오이냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00005154', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '연두부', 'N', 'N', 32, 'FT00004', 'GAM', 'FD00014732', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '미나리나물', 'N', 'N', 32, 'FT00003', 'GAM', 'FD00012235', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '깻잎나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00012206', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백4찬B', '엑셀 임포트 (당뇨4찬B)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치찌개', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00006765', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '닭볶음탕', 'N', 'N', 168, 'FT00004', 'GAM', 'FD00011581', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '비름나물된장무침', 'N', 'N', 84, 'FT00003', 'GAM', 'FD00012250', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '새송이버섯가지볶음', 'N', 'N', 85, 'FT00003', 'GAM', 'FD00010779', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨4찬C', '엑셀 임포트 (당뇨4찬C_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '깍두기', 'N', 'N', 20, 'FT00005', 'GAM', 'FD00013146', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '건포도단호박샐러드', 'N', 'N', 50, 'FT00003', 'GAM', 'FD00014721', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '현미밥', 'N', 'N', 188, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '치커리', 'N', 'N', 101, 'FT00006', 'GAM', 'FD00014693', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석4찬C', '엑셀 임포트 (신장4찬C_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리된장국', 'Y', 'Y', 58, 'FT00002', 'GAM', 'FD00014655', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '마늘쫑볶음', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00010641', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '무생채', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012349', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '카레라이스', 'N', 'N', 125, 'FT00001', 'GAM', 'FD00014733', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암4찬C', '엑셀 임포트 (신장4찬C_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리된장국', 'Y', 'Y', 58, 'FT00002', 'GAM', 'FD00014655', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '마늘쫑볶음', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00010641', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '무생채', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012349', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '카레라이스', 'N', 'N', 125, 'FT00001', 'GAM', 'FD00014733', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압4찬C', '엑셀 임포트 (고혈압4찬C)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '곤드레현미밥', 'N', 'N', 100, 'FT00001', 'GAM', 'FD00000535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '소고기뭇국', 'Y', 'Y', 82, 'FT00002', 'GAM', 'FD00005491', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부조림', 'N', 'N', 91, 'FT00004', 'GAM', 'FD00011795', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '도토리묵무침', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00012583', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '깍두기', 'N', 'N', 20, 'FT00005', 'GAM', 'FD00013146', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만4찬C', '엑셀 임포트 (비만4찬C)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭구이', 'N', 'N', 80, 'FT00004', 'GAM', 'FD00008453', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '청포묵김가루무침', 'N', 'N', 69, 'FT00006', 'GAM', 'FD00012596', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '치커리사과무침', 'N', 'N', 73, 'FT00003', 'GAM', 'FD00012417', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '하이라이스', 'N', 'N', 62, 'FT00001', 'GAM', 'FD00001224', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000047', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당4찬C', '엑셀 임포트 (당뇨4찬C_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '깍두기', 'N', 'N', 20, 'FT00005', 'GAM', 'FD00013146', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '건포도단호박샐러드', 'N', 'N', 50, 'FT00003', 'GAM', 'FD00014721', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '현미밥', 'N', 'N', 188, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '치커리', 'N', 'N', 101, 'FT00006', 'GAM', 'FD00014693', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염4찬C', '엑셀 임포트 (신장4찬C_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리된장국', 'Y', 'Y', 58, 'FT00002', 'GAM', 'FD00014655', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '마늘쫑볶음', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00010641', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '무생채', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012349', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '카레라이스', 'N', 'N', 125, 'FT00001', 'GAM', 'FD00014733', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백4찬C', '엑셀 임포트 (신장4찬C_실증)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리된장국', 'Y', 'Y', 58, 'FT00002', 'GAM', 'FD00014655', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '마늘쫑볶음', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00010641', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '무생채', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012349', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '카레라이스', 'N', 'N', 125, 'FT00001', 'GAM', 'FD00014733', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨4찬D', '엑셀 임포트 (당뇨4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '배추나물', 'N', 'N', 68, 'FT00003', 'GAM', 'FD00012239', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '사과무생채', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00012375', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석4찬D', '엑셀 임포트 (신장4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '영양밥', 'N', 'N', 101, 'FT00001', 'GAM', 'FD00001791', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '미나리무침', 'N', 'N', 82, 'FT00003', 'GAM', 'FD00012358', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)맑은대구탕', 'Y', 'Y', 75, 'FT00002', 'GAM', 'FD00014652', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)메추리알장조림', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014653', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암4찬D', '엑셀 임포트 (암4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)맑은대구탕', 'Y', 'Y', 75, 'FT00002', 'GAM', 'FD00014652', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '도토리묵무침', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00012583', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압4찬D', '엑셀 임포트 (신장4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '영양밥', 'N', 'N', 101, 'FT00001', 'GAM', 'FD00001791', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '미나리무침', 'N', 'N', 82, 'FT00003', 'GAM', 'FD00012358', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)맑은대구탕', 'Y', 'Y', 75, 'FT00002', 'GAM', 'FD00014652', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)메추리알장조림', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014653', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만4찬D', '엑셀 임포트 (비만4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭가슴살구이', 'N', 'N', 67, 'FT00004', 'GAM', 'FD00008444', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도토리묵무침', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00012583', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부동태탕', 'Y', 'Y', 97, 'FT00002', 'GAM', 'FD00005890', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '비름나물된장무침', 'N', 'N', 84, 'FT00003', 'GAM', 'FD00012250', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '잡곡찰밥', 'N', 'N', 66, 'FT00001', 'GAM', 'FD00000030', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당4찬D', '엑셀 임포트 (당뇨4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '배추나물', 'N', 'N', 68, 'FT00003', 'GAM', 'FD00012239', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '사과무생채', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00012375', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염4찬D', '엑셀 임포트 (저염4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '짜장소스', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00013552', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)물김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00014709', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)브로콜리무침', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014676', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백4찬D', '엑셀 임포트 (비만4찬D)', 'N', NULL, '4찬 한식', 'A', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭가슴살구이', 'N', 'N', 67, 'FT00004', 'GAM', 'FD00008444', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도토리묵무침', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00012583', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부동태탕', 'Y', 'Y', 97, 'FT00002', 'GAM', 'FD00005890', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '비름나물된장무침', 'N', 'N', 84, 'FT00003', 'GAM', 'FD00012250', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '잡곡찰밥', 'N', 'N', 66, 'FT00001', 'GAM', 'FD00000030', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨5찬A', '엑셀 임포트 (당뇨5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '견과류콩조림', 'N', 'N', 39, 'FT00004', 'GAM', 'FD00011781', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '더덕고추장깻잎불고기', 'N', 'N', 100, 'FT00004', 'GAM', 'FD00009875', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '바지락뭇국', 'Y', 'Y', 102, 'FT00002', 'GAM', 'FD00005298', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '스크램블에그', 'N', 'N', 45, 'FT00004', 'GAM', 'FD00014619', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '참나물무침', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00012411', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석5찬A', '엑셀 임포트 (신장5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)냉이나물', 'N', 'N', 47, 'FT00003', 'GAM', 'FD00014656', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)돼지고기간장불고기', 'N', 'N', 103, 'FT00004', 'GAM', 'FD00014657', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)호박새우젓국', 'Y', 'Y', 36, 'FT00002', 'GAM', 'FD00014658', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추', 'N', 'N', 40, 'FT00003', 'GAM', 'FD00014734', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암5찬A', '엑셀 임포트 (당뇨5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '견과류콩조림', 'N', 'N', 39, 'FT00004', 'GAM', 'FD00011781', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '더덕고추장깻잎불고기', 'N', 'N', 100, 'FT00004', 'GAM', 'FD00009875', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '바지락뭇국', 'Y', 'Y', 102, 'FT00002', 'GAM', 'FD00005298', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '스크램블에그', 'N', 'N', 45, 'FT00004', 'GAM', 'FD00014619', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '참나물무침', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00012411', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압5찬A', '엑셀 임포트 (신장5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)냉이나물', 'N', 'N', 47, 'FT00003', 'GAM', 'FD00014656', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)돼지고기간장불고기', 'N', 'N', 103, 'FT00004', 'GAM', 'FD00014657', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)호박새우젓국', 'Y', 'Y', 36, 'FT00002', 'GAM', 'FD00014658', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추', 'N', 'N', 40, 'FT00003', 'GAM', 'FD00014734', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만5찬A', '엑셀 임포트 (비만5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '와사비장', 'N', 'N', 24, 'FT00006', 'GAM', 'FD00014728', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기야채볶음', 'N', 'N', 94, 'FT00004', 'GAM', 'FD00009944', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '고추', 'N', 'N', 65, 'FT00003', 'GAM', 'FD00014729', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쑥된장국', 'Y', 'Y', 63, 'FT00002', 'GAM', 'FD00004910', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '톳밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00002032', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당5찬A', '엑셀 임포트 (당뇨5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '견과류콩조림', 'N', 'N', 39, 'FT00004', 'GAM', 'FD00011781', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '더덕고추장깻잎불고기', 'N', 'N', 100, 'FT00004', 'GAM', 'FD00009875', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '바지락뭇국', 'Y', 'Y', 102, 'FT00002', 'GAM', 'FD00005298', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '스크램블에그', 'N', 'N', 45, 'FT00004', 'GAM', 'FD00014619', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '참나물무침', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00012411', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염5찬A', '엑셀 임포트 (신장5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)냉이나물', 'N', 'N', 47, 'FT00003', 'GAM', 'FD00014656', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)돼지고기간장불고기', 'N', 'N', 103, 'FT00004', 'GAM', 'FD00014657', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)호박새우젓국', 'Y', 'Y', 36, 'FT00002', 'GAM', 'FD00014658', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추', 'N', 'N', 40, 'FT00003', 'GAM', 'FD00014734', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백5찬A', '엑셀 임포트 (고단백5찬A)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)임연수구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014682', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)냉이나물', 'N', 'N', 47, 'FT00003', 'GAM', 'FD00014656', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '참나물무침', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00012411', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨5찬B', '엑셀 임포트 (당뇨5찬B)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고구마줄기볶음', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00010505', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기김치두루치기', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009902', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미역오이냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00005154', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '카레갈치구이', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008403', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석5찬B', '엑셀 임포트 (신장5찬B_실증)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고등어구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부부침', 'N', 'N', 83, 'FT00004', 'GAM', 'FD00009038', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '렌틸콩밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000011', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '오이생채', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00012396', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물국', 'Y', 'Y', 29, 'FT00002', 'GAM', 'FD00005656', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암5찬B', '엑셀 임포트 (당뇨5찬B)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고구마줄기볶음', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00010505', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기김치두루치기', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009902', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미역오이냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00005154', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '카레갈치구이', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008403', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압5찬B', '엑셀 임포트 (당뇨5찬B)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고구마줄기볶음', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00010505', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기김치두루치기', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009902', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미역오이냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00005154', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '카레갈치구이', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008403', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만5찬B', '엑셀 임포트 (비만5찬B_실증)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '감자국', 'Y', 'Y', 72, 'FT00002', 'GAM', 'FD00005565', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '깻잎김치', 'N', 'N', 20, 'FT00005', 'GAM', 'FD00013203', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부부침', 'N', 'N', 83, 'FT00004', 'GAM', 'FD00009038', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '시금치나물', 'N', 'N', 37, 'FT00003', 'GAM', 'FD00012262', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '오징어볶음', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009515', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '잡곡밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000029', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당5찬B', '엑셀 임포트 (당뇨5찬B)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고구마줄기볶음', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00010505', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기김치두루치기', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009902', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미역오이냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00005154', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '카레갈치구이', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008403', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염5찬B', '엑셀 임포트 (신장5찬B_실증)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고등어구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부부침', 'N', 'N', 83, 'FT00004', 'GAM', 'FD00009038', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '렌틸콩밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000011', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '오이생채', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00012396', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물국', 'Y', 'Y', 29, 'FT00002', 'GAM', 'FD00005656', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백5찬B', '엑셀 임포트 (고단백5찬B)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치찌개', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00006765', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '닭볶음탕', 'N', 'N', 168, 'FT00004', 'GAM', 'FD00011581', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '돌나물무침', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00012344', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '열무김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00013148', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '시금치나물', 'N', 'N', 37, 'FT00003', 'GAM', 'FD00012262', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨5찬C', '엑셀 임포트 (당뇨5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '곤드레현미밥', 'N', 'N', 100, 'FT00001', 'GAM', 'FD00000535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '꽁치김치찜', 'N', 'N', 96, 'FT00004', 'GAM', 'FD00007633', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '소고기뭇국', 'Y', 'Y', 82, 'FT00002', 'GAM', 'FD00005491', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '양파장아찌', 'N', 'N', 42, 'FT00005', 'GAM', 'FD00013297', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '얼갈이나물', 'N', 'N', 64, 'FT00003', 'GAM', 'FD00012278', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '중화풍토마토계란볶음', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011262', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석5찬C', '엑셀 임포트 (신장5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가자미구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014659', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)죽순볶음', 'N', 'N', 59, 'FT00003', 'GAM', 'FD00014660', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)청경채무침', 'N', 'N', 54, 'FT00003', 'GAM', 'FD00014661', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)파프리카볶음', 'N', 'N', 74, 'FT00003', 'GAM', 'FD00014662', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)팽이된장국', 'Y', 'Y', 40, 'FT00002', 'GAM', 'FD00014663', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암5찬C', '엑셀 임포트 (당뇨5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '곤드레현미밥', 'N', 'N', 100, 'FT00001', 'GAM', 'FD00000535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '꽁치김치찜', 'N', 'N', 96, 'FT00004', 'GAM', 'FD00007633', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '소고기뭇국', 'Y', 'Y', 82, 'FT00002', 'GAM', 'FD00005491', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '양파장아찌', 'N', 'N', 42, 'FT00005', 'GAM', 'FD00013297', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '얼갈이나물', 'N', 'N', 64, 'FT00003', 'GAM', 'FD00012278', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '중화풍토마토계란볶음', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011262', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압5찬C', '엑셀 임포트 (고혈압5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭갈비', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009808', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '삼치엿장조림', 'N', 'N', 30, 'FT00004', 'GAM', 'FD00011503', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '새송이된장국', 'Y', 'Y', 56, 'FT00002', 'GAM', 'FD00014632', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '수수밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000023', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '느타리버섯볶음', 'N', 'N', 38, 'FT00003', 'GAM', 'FD00011285', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추찜', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00014706', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만5찬C', '엑셀 임포트 (비만5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭갈비', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009808', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '삼치엿장조림', 'N', 'N', 30, 'FT00004', 'GAM', 'FD00011503', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '새송이된장국', 'Y', 'Y', 56, 'FT00002', 'GAM', 'FD00014632', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '수수밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000023', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쑥갓나물무침', 'N', 'N', 64, 'FT00003', 'GAM', 'FD00014633', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추찜', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00014706', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당5찬C', '엑셀 임포트 (당뇨5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '곤드레현미밥', 'N', 'N', 100, 'FT00001', 'GAM', 'FD00000535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '꽁치김치찜', 'N', 'N', 96, 'FT00004', 'GAM', 'FD00007633', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '소고기뭇국', 'Y', 'Y', 82, 'FT00002', 'GAM', 'FD00005491', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '양파장아찌', 'N', 'N', 42, 'FT00005', 'GAM', 'FD00013297', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '얼갈이나물', 'N', 'N', 64, 'FT00003', 'GAM', 'FD00012278', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '중화풍토마토계란볶음', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011262', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염5찬C', '엑셀 임포트 (신장5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가자미구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014659', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)죽순볶음', 'N', 'N', 59, 'FT00003', 'GAM', 'FD00014660', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)청경채무침', 'N', 'N', 54, 'FT00003', 'GAM', 'FD00014661', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)파프리카볶음', 'N', 'N', 74, 'FT00003', 'GAM', 'FD00014662', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)팽이된장국', 'Y', 'Y', 40, 'FT00002', 'GAM', 'FD00014663', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백5찬C', '엑셀 임포트 (고단백5찬C)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '곤드레현미밥', 'N', 'N', 100, 'FT00001', 'GAM', 'FD00000535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)청경채무침', 'N', 'N', 54, 'FT00003', 'GAM', 'FD00014661', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '콩나물무침', 'N', 'N', 39, 'FT00003', 'GAM', 'FD00012299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '얼갈이나물', 'N', 'N', 64, 'FT00003', 'GAM', 'FD00012278', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨5찬D', '엑셀 임포트 (당뇨5찬D_실증)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '달걀찜', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008216', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '북어국', 'Y', 'Y', 42, 'FT00002', 'GAM', 'FD00005324', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '연근조림', 'N', 'N', 31, 'FT00003', 'GAM', 'FD00011740', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '오리고추장불고기', 'N', 'N', 70, 'FT00004', 'GAM', 'FD00010282', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '잡곡밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000029', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '총각김치', 'N', 'N', 35, 'FT00005', 'GAM', 'FD00013151', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석5찬D', '엑셀 임포트 (신장5찬D)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)간장오리불고기', 'N', 'N', 73, 'FT00004', 'GAM', 'FD00014664', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)고사리나물', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00014665', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)무된장국', 'Y', 'Y', 50, 'FT00002', 'GAM', 'FD00014666', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '숙주미나리무침', 'N', 'N', 80, 'FT00003', 'GAM', 'FD00012259', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '오이나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012285', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암5찬D', '엑셀 임포트 (암5찬D)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '김자반', 'N', 'N', 9, 'FT00003', 'GAM', 'FD00011342', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '달걀찜', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008216', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '배추나물', 'N', 'N', 68, 'FT00003', 'GAM', 'FD00012239', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압5찬D', '엑셀 임포트 (고혈압5찬D)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)고사리나물', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00014665', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)물김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00014709', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '미나리무침', 'N', 'N', 82, 'FT00003', 'GAM', 'FD00012358', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만5찬D', '엑셀 임포트 (비만5찬D)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '녹두밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000010', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기쭈꾸미볶음', 'N', 'N', 59, 'FT00004', 'GAM', 'FD00009310', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '미나리무침', 'N', 'N', 82, 'FT00003', 'GAM', 'FD00012358', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '방어구이', 'N', 'N', 23, 'FT00004', 'GAM', 'FD00014634', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '우거지된장국', 'Y', 'Y', 28, 'FT00002', 'GAM', 'FD00004924', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '케일', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00014730', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당5찬D', '엑셀 임포트 (당뇨5찬D_실증)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '달걀찜', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008216', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '북어국', 'Y', 'Y', 42, 'FT00002', 'GAM', 'FD00005324', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '연근조림', 'N', 'N', 31, 'FT00003', 'GAM', 'FD00011740', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '오리고추장불고기', 'N', 'N', 70, 'FT00004', 'GAM', 'FD00010282', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '잡곡밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000029', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '총각김치', 'N', 'N', 35, 'FT00005', 'GAM', 'FD00013151', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염5찬D', '엑셀 임포트 (저염5찬D)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '북어국', 'Y', 'Y', 42, 'FT00002', 'GAM', 'FD00005324', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)양배추소고기볶음', 'N', 'N', 71, 'FT00004', 'GAM', 'FD00014677', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '사과무생채', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00012375', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '숙주미나리무침', 'N', 'N', 80, 'FT00003', 'GAM', 'FD00012259', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백5찬D', '엑셀 임포트 (고단백5찬D)', 'N', NULL, '5찬 한식', 'B', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '숙주나물버섯국', 'Y', 'Y', 74, 'FT00002', 'GAM', 'FD00014621', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '미역줄기볶음', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00011350', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '총각김치', 'N', 'N', 35, 'FT00005', 'GAM', 'FD00013151', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '(저염)물김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00014709', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨6찬A', '엑셀 임포트 (당뇨6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '달래양념장', 'N', 'N', 80, 'FT00006', 'GAM', 'FD00013388', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '들깨취나물볶음', 'N', 'N', 79, 'FT00003', 'GAM', 'FD00010628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '보리새우미역국', 'Y', 'Y', 10, 'FT00002', 'GAM', 'FD00014620', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '봄동겉절이', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00012367', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '오이김치', 'N', 'N', 61, 'FT00005', 'GAM', 'FD00013223', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물닭갈비', 'N', 'N', 169, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '표고버섯흑미밥', 'N', 'N', 90, 'FT00001', 'GAM', 'FD00001824', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석6찬A', '엑셀 임포트 (신장6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가자미조림', 'N', 'N', 68, 'FT00004', 'GAM', 'FD00014667', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)달래된장국', 'Y', 'Y', 30, 'FT00002', 'GAM', 'FD00014668', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '잡채', 'N', 'N', 76, 'FT00006', 'GAM', 'FD00011395', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '(저염)우엉채볶음', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014670', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '온두부', 'N', 'N', 64, 'FT00004', 'GAM', 'FD00014735', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암6찬A', '엑셀 임포트 (당뇨6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '달래양념장', 'N', 'N', 80, 'FT00006', 'GAM', 'FD00013388', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '들깨취나물볶음', 'N', 'N', 79, 'FT00003', 'GAM', 'FD00010628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '보리새우미역국', 'Y', 'Y', 10, 'FT00002', 'GAM', 'FD00014620', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '봄동겉절이', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00012367', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '오이김치', 'N', 'N', 61, 'FT00005', 'GAM', 'FD00013223', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물닭갈비', 'N', 'N', 169, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '표고버섯흑미밥', 'N', 'N', 90, 'FT00001', 'GAM', 'FD00001824', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압6찬A', '엑셀 임포트 (신장6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가자미조림', 'N', 'N', 68, 'FT00004', 'GAM', 'FD00014667', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)달래된장국', 'Y', 'Y', 30, 'FT00002', 'GAM', 'FD00014668', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '잡채', 'N', 'N', 76, 'FT00006', 'GAM', 'FD00011395', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '(저염)우엉채볶음', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014670', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '온두부', 'N', 'N', 64, 'FT00004', 'GAM', 'FD00014735', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만6찬A', '엑셀 임포트 (비만6찬A_실증)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '계란말이', 'N', 'N', 52, 'FT00004', 'GAM', 'FD00009056', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지갈비찜', 'N', 'N', 87, 'FT00004', 'GAM', 'FD00007858', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '미역국', 'Y', 'Y', 39, 'FT00002', 'GAM', 'FD00005069', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '배추김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00013129', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '잡곡밥', 'N', 'N', 60, 'FT00001', 'GAM', 'FD00000029', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '잡채', 'N', 'N', 76, 'FT00006', 'GAM', 'FD00011395', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '참나물무침', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00012411', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당6찬A', '엑셀 임포트 (당뇨6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '달래양념장', 'N', 'N', 80, 'FT00006', 'GAM', 'FD00013388', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '들깨취나물볶음', 'N', 'N', 79, 'FT00003', 'GAM', 'FD00010628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '보리새우미역국', 'Y', 'Y', 10, 'FT00002', 'GAM', 'FD00014620', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '봄동겉절이', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00012367', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '오이김치', 'N', 'N', 61, 'FT00005', 'GAM', 'FD00013223', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물닭갈비', 'N', 'N', 169, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '표고버섯흑미밥', 'N', 'N', 90, 'FT00001', 'GAM', 'FD00001824', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염6찬A', '엑셀 임포트 (저염6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '주꾸미천사채볶음', 'N', 'N', 142, 'FT00004', 'GAM', 'FD00014617', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '애호박볶음', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011512', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)봄동나물', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014681', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '들깨취나물볶음', 'N', 'N', 79, 'FT00003', 'GAM', 'FD00010628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '양배추', 'N', 'N', 40, 'FT00003', 'GAM', 'FD00014734', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백6찬A', '엑셀 임포트 (고단백6찬A)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '병아리콩현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014718', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '주꾸미천사채볶음', 'N', 'N', 142, 'FT00004', 'GAM', 'FD00014617', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '콩나물닭갈비', 'N', 'N', 169, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)콜리플라워볶음', 'N', 'N', 65, 'FT00003', 'GAM', 'FD00014646', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '양배추', 'N', 'N', 40, 'FT00003', 'GAM', 'FD00014734', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨6찬B', '엑셀 임포트 (당뇨6찬B_실증)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭찜', 'N', 'N', 105, 'FT00004', 'GAM', 'FD00007847', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '오징어채', 'N', 'N', 10, 'FT00004', 'GAM', 'FD00014622', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '육개장', 'Y', 'Y', 77, 'FT00002', 'GAM', 'FD00005528', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '깻잎나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00012206', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '호박나물', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00012311', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석6찬B', '엑셀 임포트 (신장6찬B)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)더덕구이', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014671', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)미소장국', 'Y', 'Y', 7, 'FT00002', 'GAM', 'FD00014672', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)생선까스', 'N', 'N', 103, 'FT00004', 'GAM', 'FD00014673', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '감자샐러드', 'N', 'N', 51, 'FT00003', 'GAM', 'FD00012889', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미나리나물', 'N', 'N', 32, 'FT00003', 'GAM', 'FD00012235', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)오이김치', 'N', 'N', 30, 'FT00005', 'GAM', 'FD00014708', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암6찬B', '엑셀 임포트 (당뇨6찬B_실증)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭찜', 'N', 'N', 105, 'FT00004', 'GAM', 'FD00007847', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '오징어채', 'N', 'N', 10, 'FT00004', 'GAM', 'FD00014622', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '육개장', 'Y', 'Y', 77, 'FT00002', 'GAM', 'FD00005528', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '깻잎나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00012206', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '호박나물', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00012311', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압6찬B', '엑셀 임포트 (신장6찬B)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)더덕구이', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014671', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)미소장국', 'Y', 'Y', 7, 'FT00002', 'GAM', 'FD00014672', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)생선까스', 'N', 'N', 103, 'FT00004', 'GAM', 'FD00014673', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '감자샐러드', 'N', 'N', 51, 'FT00003', 'GAM', 'FD00012889', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미나리나물', 'N', 'N', 32, 'FT00003', 'GAM', 'FD00012235', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)오이김치', 'N', 'N', 30, 'FT00005', 'GAM', 'FD00014708', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만6찬B', '엑셀 임포트 (비만6찬B)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '간장닭조림', 'N', 'N', 56, 'FT00004', 'GAM', 'FD00011544', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '강된장찌개', 'Y', 'Y', 122, 'FT00002', 'GAM', 'FD00006535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '계란후라이', 'N', 'N', 32, 'FT00004', 'GAM', 'FD00014635', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '보리밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000020', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '시금치나물', 'N', 'N', 58, 'FT00003', 'GAM', 'FD00012262', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '열무김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00013148', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '콜라비생채', 'N', 'N', 75, 'FT00003', 'GAM', 'FD00012418', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당6찬B', '엑셀 임포트 (당뇨6찬B_실증)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭찜', 'N', 'N', 105, 'FT00004', 'GAM', 'FD00007847', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '오징어채', 'N', 'N', 10, 'FT00004', 'GAM', 'FD00014622', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '육개장', 'Y', 'Y', 77, 'FT00002', 'GAM', 'FD00005528', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '깻잎나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00012206', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '호박나물', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00012311', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염6찬B', '엑셀 임포트 (저염6찬B)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00000047', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치찌개', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00006765', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '갈치조림', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011447', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)석쇠돼지불고기', 'N', 'N', 57, 'FT00004', 'GAM', 'FD00014686', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)가지볶음', 'N', 'N', 77, 'FT00003', 'GAM', 'FD00014647', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '부추무침', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012372', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)새송이버섯볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014685', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백6찬B', '엑셀 임포트 (당뇨6찬B_실증)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '닭찜', 'N', 'N', 105, 'FT00004', 'GAM', 'FD00007847', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '오징어채', 'N', 'N', 10, 'FT00004', 'GAM', 'FD00014622', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '육개장', 'Y', 'Y', 77, 'FT00002', 'GAM', 'FD00005528', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '기장현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014723', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '깻잎나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00012206', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '도라지나물', 'N', 'N', 56, 'FT00003', 'GAM', 'FD00012215', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '호박나물', 'N', 'N', 52, 'FT00003', 'GAM', 'FD00012311', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨6찬C', '엑셀 임포트 (당뇨6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리버섯양념꼬치', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00008766', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '백김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00013142', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '삼치구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008353', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '섭산적', 'N', 'N', 42, 'FT00004', 'GAM', 'FD00008568', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '차조현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014724', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩비지찌개', 'Y', 'Y', 134, 'FT00002', 'GAM', 'FD00007499', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '풋고추된장무침', 'N', 'N', 62, 'FT00003', 'GAM', 'FD00012426', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석6찬C', '엑셀 임포트 (신장6찬C_실증)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고등어조림', 'N', 'N', 80, 'FT00004', 'GAM', 'FD00011461', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '느타리버섯볶음', 'N', 'N', 38, 'FT00003', 'GAM', 'FD00011285', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기볶음', 'N', 'N', 74, 'FT00004', 'GAM', 'FD00009935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '배추김치', 'N', 'N', 20, 'FT00005', 'GAM', 'FD00013129', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '오이냉국', 'Y', 'Y', 39, 'FT00002', 'GAM', 'FD00005165', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '치커리겉절이', 'N', 'N', 17, 'FT00003', 'GAM', 'FD00012415', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암6찬C', '엑셀 임포트 (당뇨6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리버섯양념꼬치', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00008766', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '백김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00013142', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '삼치구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008353', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '섭산적', 'N', 'N', 42, 'FT00004', 'GAM', 'FD00008568', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '차조현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014724', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩비지찌개', 'Y', 'Y', 134, 'FT00002', 'GAM', 'FD00007499', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '풋고추된장무침', 'N', 'N', 62, 'FT00003', 'GAM', 'FD00012426', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압6찬C', '엑셀 임포트 (고혈압6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '차조밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000031', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '섭산적', 'N', 'N', 42, 'FT00004', 'GAM', 'FD00008568', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '고등어조림', 'N', 'N', 80, 'FT00004', 'GAM', 'FD00011461', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '감자조림', 'N', 'N', 44, 'FT00003', 'GAM', 'FD00011768', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물무침', 'N', 'N', 39, 'FT00003', 'GAM', 'FD00012299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)청경채무침', 'N', 'N', 54, 'FT00003', 'GAM', 'FD00014661', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만6찬C', '엑셀 임포트 (비만6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '근대된장국', 'Y', 'Y', 57, 'FT00002', 'GAM', 'FD00004732', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '무말랭이무침', 'N', 'N', 28, 'FT00003', 'GAM', 'FD00012233', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '배추김치', 'N', 'N', 30, 'FT00005', 'GAM', 'FD00013129', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '부추전', 'N', 'N', 44, 'FT00003', 'GAM', 'FD00008954', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '수육', 'N', 'N', 30, 'FT00004', 'GAM', 'FD00007969', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '오곡밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000025', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '취나물', 'N', 'N', 62, 'FT00003', 'GAM', 'FD00014636', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당6찬C', '엑셀 임포트 (당뇨6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '느타리버섯양념꼬치', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00008766', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '백김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00013142', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '삼치구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008353', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '섭산적', 'N', 'N', 42, 'FT00004', 'GAM', 'FD00008568', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '차조현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014724', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩비지찌개', 'Y', 'Y', 134, 'FT00002', 'GAM', 'FD00007499', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '풋고추된장무침', 'N', 'N', 62, 'FT00003', 'GAM', 'FD00012426', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염6찬C', '엑셀 임포트 (저염6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '곤드레현미밥', 'N', 'N', 100, 'FT00001', 'GAM', 'FD00000535', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '느타리된장국', 'Y', 'Y', 58, 'FT00002', 'GAM', 'FD00014655', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '삼치구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008353', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '부추전', 'N', 'N', 44, 'FT00003', 'GAM', 'FD00008954', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '청포묵김가루무침', 'N', 'N', 69, 'FT00006', 'GAM', 'FD00012596', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '마늘쫑볶음', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00010641', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '취나물', 'N', 'N', 62, 'FT00003', 'GAM', 'FD00014636', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백6찬C', '엑셀 임포트 (고단백6찬C)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '차조밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00000031', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '삼치구이', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00008353', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '닭갈비', 'N', 'N', 101, 'FT00004', 'GAM', 'FD00009808', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '취나물', 'N', 'N', 62, 'FT00003', 'GAM', 'FD00014636', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '삼치엿장조림', 'N', 'N', 30, 'FT00004', 'GAM', 'FD00011503', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '깍두기', 'N', 'N', 20, 'FT00005', 'GAM', 'FD00013146', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨6찬D', '엑셀 임포트 (당뇨6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '계란장조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011808', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '배추겉절이', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00012364', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '브로콜리마늘볶음', 'N', 'N', 48, 'FT00003', 'GAM', 'FD00010757', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '숙주나물버섯국', 'Y', 'Y', 74, 'FT00002', 'GAM', 'FD00014621', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '파프리카쌈장무침', 'N', 'N', 76, 'FT00003', 'GAM', 'FD00012424', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '흑미현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014725', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석6찬D', '엑셀 임포트 (신장6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)동태조림', 'N', 'N', 74, 'FT00004', 'GAM', 'FD00014674', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)배추국', 'Y', 'Y', 36, 'FT00002', 'GAM', 'FD00014675', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)브로콜리무침', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014676', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)양배추소고기볶음', 'N', 'N', 71, 'FT00004', 'GAM', 'FD00014677', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)물김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00014709', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암6찬D', '엑셀 임포트 (당뇨6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '계란장조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011808', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '배추겉절이', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00012364', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '브로콜리마늘볶음', 'N', 'N', 48, 'FT00003', 'GAM', 'FD00010757', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '숙주나물버섯국', 'Y', 'Y', 74, 'FT00002', 'GAM', 'FD00014621', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '파프리카쌈장무침', 'N', 'N', 76, 'FT00003', 'GAM', 'FD00012424', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '흑미현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014725', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압6찬D', '엑셀 임포트 (신장6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)동태조림', 'N', 'N', 74, 'FT00004', 'GAM', 'FD00014674', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)배추국', 'Y', 'Y', 36, 'FT00002', 'GAM', 'FD00014675', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)브로콜리무침', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014676', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)양배추소고기볶음', 'N', 'N', 71, 'FT00004', 'GAM', 'FD00014677', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '쌀밥', 'N', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)물김치', 'N', 'N', 40, 'FT00005', 'GAM', 'FD00014709', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만6찬D', '엑셀 임포트 (비만6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '굴국', 'Y', 'Y', 60, 'FT00002', 'GAM', 'FD00005205', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김자반', 'N', 'N', 9, 'FT00003', 'GAM', 'FD00011342', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '날치알계란찜', 'N', 'N', 23, 'FT00004', 'GAM', 'FD00008205', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '동치미', 'N', 'N', 65, 'FT00005', 'GAM', 'FD00013157', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '메추리알곤약조림', 'N', 'N', 56, 'FT00004', 'GAM', 'FD00014637', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '브로콜리', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00014731', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '영양밥', 'N', 'N', 101, 'FT00001', 'GAM', 'FD00001791', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당6찬D', '엑셀 임포트 (당뇨6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '계란장조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011808', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '배추겉절이', 'N', 'N', 61, 'FT00003', 'GAM', 'FD00012364', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '브로콜리마늘볶음', 'N', 'N', 48, 'FT00003', 'GAM', 'FD00010757', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '숙주나물버섯국', 'Y', 'Y', 74, 'FT00002', 'GAM', 'FD00014621', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '파프리카쌈장무침', 'N', 'N', 76, 'FT00003', 'GAM', 'FD00012424', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '흑미현미밥', 'N', 'N', 65, 'FT00001', 'GAM', 'FD00014725', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염6찬D', '엑셀 임포트 (저염6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)양배추소고기볶음', 'N', 'N', 71, 'FT00004', 'GAM', 'FD00014677', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '숙주나물', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012257', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '도토리묵무침', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00012583', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백6찬D', '엑셀 임포트 (고단백6찬D)', 'N', NULL, '6찬 한식', 'C', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '완두콩현미밥', 'N', 'N', 70, 'FT00001', 'GAM', 'FD00014722', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '숙주나물', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012257', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '꽈리고추찜', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00008079', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '동치미', 'N', 'N', 65, 'FT00005', 'GAM', 'FD00013157', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨7찬A', '엑셀 임포트 (당뇨7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기찹스테이크', 'N', 'N', 133, 'FT00004', 'GAM', 'FD00008493', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '멸치볶음', 'N', 'N', 16, 'FT00004', 'GAM', 'FD00009377', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '봄동된장국', 'Y', 'Y', 57, 'FT00002', 'GAM', 'FD00004870', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추샐러드', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00012807', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '유자드레싱', 'N', 'N', 12, 'FT00006', 'GAM', 'FD00014625', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석7찬A', '엑셀 임포트 (신장7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)냉이된장국', 'Y', 'Y', 35, 'FT00002', 'GAM', 'FD00014679', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)무나물', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00014680', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)봄동나물', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014681', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)임연수구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014682', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '발사믹드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00013475', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '새싹샐러드', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012792', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '애호박볶음', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011512', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암7찬A', '엑셀 임포트 (암7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '콩나물닭갈비', 'N', 'N', 169, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '낙지볶음', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00009292', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '부추나물', 'N', 'N', 42, 'FT00003', 'GAM', 'FD00012243', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '그린샐러드', 'N', 'N', 83, 'FT00003', 'GAM', 'FD00014638', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '머스타드드레싱', 'N', 'N', 31, 'FT00006', 'GAM', 'FD00014639', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압7찬A', '엑셀 임포트 (신장7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)냉이된장국', 'Y', 'Y', 35, 'FT00002', 'GAM', 'FD00014679', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)무나물', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00014680', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)봄동나물', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014681', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)임연수구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014682', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '발사믹드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00013475', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '새싹샐러드', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012792', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '애호박볶음', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011512', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만7찬A', '엑셀 임포트 (비만7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '그린샐러드', 'N', 'N', 83, 'FT00003', 'GAM', 'FD00014638', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '낙지볶음', 'N', 'N', 57, 'FT00004', 'GAM', 'FD00009292', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '머스타드드레싱', 'N', 'N', 16, 'FT00006', 'GAM', 'FD00014639', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '무쌈', 'N', 'N', 65, 'FT00005', 'GAM', 'FD00013320', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '부추나물', 'N', 'N', 42, 'FT00003', 'GAM', 'FD00012243', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '시래기된장국', 'Y', 'Y', 62, 'FT00002', 'GAM', 'FD00004904', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '오리구이', 'N', 'N', 36, 'FT00004', 'GAM', 'FD00008600', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당7찬A', '엑셀 임포트 (당뇨7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '검은콩조림', 'N', 'N', 28, 'FT00004', 'GAM', 'FD00011780', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돼지고기찹스테이크', 'N', 'N', 133, 'FT00004', 'GAM', 'FD00008493', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '버섯들깨볶음', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00011307', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '멸치볶음', 'N', 'N', 16, 'FT00004', 'GAM', 'FD00009377', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '봄동된장국', 'Y', 'Y', 57, 'FT00002', 'GAM', 'FD00004870', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추샐러드', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00012807', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '유자드레싱', 'N', 'N', 12, 'FT00006', 'GAM', 'FD00014625', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염7찬A', '엑셀 임포트 (신장7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)냉이된장국', 'Y', 'Y', 35, 'FT00002', 'GAM', 'FD00014679', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)무나물', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00014680', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)봄동나물', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014681', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)임연수구이', 'N', 'N', 63, 'FT00004', 'GAM', 'FD00014682', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '발사믹드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00013475', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '새싹샐러드', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012792', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '애호박볶음', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011512', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백7찬A', '엑셀 임포트 (고단백7찬A)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '돼지고기호박고추장찌개', 'Y', 'Y', 118, 'FT00002', 'GAM', 'FD00006935', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '콩나물닭갈비', 'N', 'N', 174, 'FT00004', 'GAM', 'FD00010369', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '낙지볶음', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00009292', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '오이김치', 'N', 'N', 61, 'FT00005', 'GAM', 'FD00013223', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '(저염)냉이나물', 'N', 'N', 47, 'FT00003', 'GAM', 'FD00014656', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추샐러드', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00012807', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '유자드레싱', 'N', 'N', 12, 'FT00006', 'GAM', 'FD00014625', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨7찬B', '엑셀 임포트 (당뇨7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '갈치조림', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011447', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '근대된장나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014626', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '방울토마토', 'N', 'N', 70, 'FT00006', 'GAM', 'FD00014696', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '부추무침', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012372', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '소고기메추리알장조림', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011640', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '키위드레싱', 'N', 'N', 24, 'FT00006', 'GAM', 'FD00014627', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '팽이버섯달걀국', 'Y', 'Y', 49, 'FT00002', 'GAM', 'FD00005747', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석7찬B', '엑셀 임포트 (신장7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가지냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00014683', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)머위나물', 'N', 'N', 59, 'FT00003', 'GAM', 'FD00014684', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)새송이버섯볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014685', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)석쇠돼지불고기', 'N', 'N', 57, 'FT00004', 'GAM', 'FD00014686', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '상추샐러드', 'N', 'N', 90, 'FT00003', 'GAM', 'FD00012790', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '연근튀김', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00014687', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '이탈리안드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00014711', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암7찬B', '엑셀 임포트 (당뇨7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '갈치조림', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011447', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '근대된장나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014626', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '방울토마토', 'N', 'N', 70, 'FT00006', 'GAM', 'FD00014696', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '부추무침', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012372', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '소고기메추리알장조림', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011640', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '키위드레싱', 'N', 'N', 24, 'FT00006', 'GAM', 'FD00014627', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '팽이버섯달걀국', 'Y', 'Y', 49, 'FT00002', 'GAM', 'FD00005747', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압7찬B', '엑셀 임포트 (신장7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가지냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00014683', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)머위나물', 'N', 'N', 59, 'FT00003', 'GAM', 'FD00014684', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)새송이버섯볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014685', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)석쇠돼지불고기', 'N', 'N', 57, 'FT00004', 'GAM', 'FD00014686', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '상추샐러드', 'N', 'N', 90, 'FT00003', 'GAM', 'FD00012790', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '연근튀김', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00014687', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '이탈리안드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00014711', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만7찬B', '엑셀 임포트 (비만7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '깻잎나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00012206', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '돌나물무침', 'N', 'N', 55, 'FT00003', 'GAM', 'FD00012344', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '미트볼조림', 'N', 'N', 43, 'FT00004', 'GAM', 'FD00011625', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '발사믹드레싱', 'N', 'N', 4, 'FT00006', 'GAM', 'FD00013475', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '연두부', 'N', 'N', 32, 'FT00004', 'GAM', 'FD00014732', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '콩나물아욱국', 'Y', 'Y', 90, 'FT00002', 'GAM', 'FD00005663', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '파프리카샐러드', 'N', 'N', 70, 'FT00003', 'GAM', 'FD00012860', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당7찬B', '엑셀 임포트 (당뇨7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '갈치조림', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011447', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '근대된장나물', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014626', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '방울토마토', 'N', 'N', 70, 'FT00006', 'GAM', 'FD00014696', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '부추무침', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00012372', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '소고기메추리알장조림', 'N', 'N', 62, 'FT00004', 'GAM', 'FD00011640', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '키위드레싱', 'N', 'N', 24, 'FT00006', 'GAM', 'FD00014627', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '팽이버섯달걀국', 'Y', 'Y', 49, 'FT00002', 'GAM', 'FD00005747', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염7찬B', '엑셀 임포트 (신장7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)가지냉국', 'Y', 'Y', 44, 'FT00002', 'GAM', 'FD00014683', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)머위나물', 'N', 'N', 59, 'FT00003', 'GAM', 'FD00014684', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)새송이버섯볶음', 'N', 'N', 71, 'FT00003', 'GAM', 'FD00014685', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)석쇠돼지불고기', 'N', 'N', 57, 'FT00004', 'GAM', 'FD00014686', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '상추샐러드', 'N', 'N', 90, 'FT00003', 'GAM', 'FD00012790', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '연근튀김', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00014687', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '이탈리안드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00014711', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백7찬B', '엑셀 임포트 (고단백7찬B)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '김치찌개', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00006765', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '닭볶음탕', 'N', 'N', 168, 'FT00004', 'GAM', 'FD00011581', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '상추', 'N', 'N', 95, 'FT00006', 'GAM', 'FD00014697', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '카레갈치구이', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008403', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '새송이버섯가지볶음', 'N', 'N', 85, 'FT00003', 'GAM', 'FD00010779', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '방울토마토', 'N', 'N', 70, 'FT00006', 'GAM', 'FD00014696', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '키위드레싱', 'N', 'N', 24, 'FT00006', 'GAM', 'FD00014627', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨7찬C', '엑셀 임포트 (당뇨7찬C_실증)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '건새우볶음', 'N', 'N', 8, 'FT00004', 'GAM', 'FD00009200', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치국', 'Y', 'Y', 61, 'FT00002', 'GAM', 'FD00014631', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부조림', 'N', 'N', 91, 'FT00004', 'GAM', 'FD00011795', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '상추', 'N', 'N', 95, 'FT00006', 'GAM', 'FD00014697', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '연근', 'N', 'N', 35, 'FT00003', 'GAM', 'FD00014727', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '흑임자드레싱', 'N', 'N', 15, 'FT00006', 'GAM', 'FD00014699', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '콩나물무침', 'N', 'N', 39, 'FT00003', 'GAM', 'FD00012299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석7찬C', '엑셀 임포트 (신장7찬C)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '(저염)고갈비', 'N', 'N', 70, 'FT00004', 'GAM', 'FD00014688', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '(저염)애호박된장국', 'Y', 'Y', 40, 'FT00002', 'GAM', 'FD00014689', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '(저염)열무나물', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014690', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '도라지생채', 'N', 'N', 25, 'FT00003', 'GAM', 'FD00012338', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '돌나물샐러드', 'N', 'N', 26, 'FT00003', 'GAM', 'FD00012751', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '레몬드레싱', 'N', 'N', 15, 'FT00006', 'GAM', 'FD00014691', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '파전', 'N', 'N', 34, 'FT00003', 'GAM', 'FD00014692', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암7찬C', '엑셀 임포트 (암7찬C)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '꽁치김치찜', 'N', 'N', 96, 'FT00004', 'GAM', 'FD00007633', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '중화풍토마토계란볶음', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011262', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '무말랭이무침', 'N', 'N', 28, 'FT00003', 'GAM', 'FD00012233', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '돌나물샐러드', 'N', 'N', 26, 'FT00003', 'GAM', 'FD00012751', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '레몬드레싱', 'N', 'N', 15, 'FT00006', 'GAM', 'FD00014691', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압7찬C', '엑셀 임포트 (비만7찬C_실증)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '갈치구이', 'N', 'N', 42, 'FT00004', 'GAM', 'FD00008294', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '감자조림', 'N', 'N', 44, 'FT00003', 'GAM', 'FD00011768', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '과일샐러드', 'N', 'N', 24, 'FT00003', 'GAM', 'FD00012726', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '요거트드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00014643', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '돼지고기고추장볶음', 'N', 'N', 68, 'FT00004', 'GAM', 'FD00009897', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '마늘쫑장아찌', 'N', 'N', 10, 'FT00005', 'GAM', 'FD00013287', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '배추된장국', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00004849', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000010', '비만 관리 식단', '비만7찬C', '엑셀 임포트 (비만7찬C_실증)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000010';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '갈치구이', 'N', 'N', 42, 'FT00004', 'GAM', 'FD00008294', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '감자조림', 'N', 'N', 44, 'FT00003', 'GAM', 'FD00011768', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '과일샐러드', 'N', 'N', 24, 'FT00003', 'GAM', 'FD00012726', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '요거트드레싱', 'N', 'N', 7, 'FT00006', 'GAM', 'FD00014643', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '돼지고기고추장볶음', 'N', 'N', 68, 'FT00004', 'GAM', 'FD00009897', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '마늘쫑장아찌', 'N', 'N', 10, 'FT00005', 'GAM', 'FD00013287', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '배추된장국', 'Y', 'Y', 78, 'FT00002', 'GAM', 'FD00004849', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당7찬C', '엑셀 임포트 (당뇨7찬C_실증)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '건새우볶음', 'N', 'N', 8, 'FT00004', 'GAM', 'FD00009200', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '김치국', 'Y', 'Y', 61, 'FT00002', 'GAM', 'FD00014631', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '두부조림', 'N', 'N', 91, 'FT00004', 'GAM', 'FD00011795', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '상추', 'N', 'N', 95, 'FT00006', 'GAM', 'FD00014697', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '연근', 'N', 'N', 35, 'FT00003', 'GAM', 'FD00014727', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '흑임자드레싱', 'N', 'N', 15, 'FT00006', 'GAM', 'FD00014699', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '콩나물무침', 'N', 'N', 39, 'FT00003', 'GAM', 'FD00012299', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염7찬C', '엑셀 임포트 (저염7찬C)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '소고기뭇국', 'Y', 'Y', 82, 'FT00002', 'GAM', 'FD00005491', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '동태전', 'N', 'N', 46, 'FT00004', 'GAM', 'FD00008853', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '고등어조림', 'N', 'N', 80, 'FT00004', 'GAM', 'FD00011461', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)죽순볶음', 'N', 'N', 59, 'FT00003', 'GAM', 'FD00014660', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '마늘쫑볶음', 'N', 'N', 60, 'FT00003', 'GAM', 'FD00010641', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '돌나물샐러드', 'N', 'N', 26, 'FT00003', 'GAM', 'FD00012751', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '레몬드레싱', 'N', 'N', 15, 'FT00006', 'GAM', 'FD00014691', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백7찬C', '엑셀 임포트 (고단백7찬C)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '미역된장국', 'Y', 'Y', 11, 'FT00002', 'GAM', 'FD00004835', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '꽁치김치찜', 'N', 'N', 96, 'FT00004', 'GAM', 'FD00007633', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지고기찹스테이크', 'N', 'N', 153, 'FT00004', 'GAM', 'FD00008493', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '중화풍토마토계란볶음', 'N', 'N', 108, 'FT00004', 'GAM', 'FD00011262', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '무말랭이무침', 'N', 'N', 28, 'FT00003', 'GAM', 'FD00012233', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '돌나물샐러드', 'N', 'N', 26, 'FT00003', 'GAM', 'FD00012751', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '레몬드레싱', 'N', 'N', 15, 'FT00006', 'GAM', 'FD00014691', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000001', '당뇨환자 식단', '당뇨7찬D', '엑셀 임포트 (당뇨7찬D)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000001';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '귤드레싱', 'N', 'N', 19, 'FT00006', 'GAM', 'FD00014628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '숙주나물', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012257', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '느타리배추국', 'Y', 'Y', 64, 'FT00002', 'GAM', 'FD00014629', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '양상추', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00014726', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '우엉고구마조림', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014630', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '조기구이', 'N', 'N', 33, 'FT00004', 'GAM', 'FD00008393', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '콩나물제육볶음', 'N', 'N', 109, 'FT00004', 'GAM', 'FD00010377', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000002', '신장질환환자(투석) 식단', '신장투석7찬D', '엑셀 임포트 (신장7찬D_실증)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000002';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '고등어김치찜', 'N', 'N', 75, 'FT00004', 'GAM', 'FD00007616', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '꽈리고추찜', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00008079', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '돼지갈비구이', 'N', 'N', 61, 'FT00004', 'GAM', 'FD00008485', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '무국', 'Y', 'Y', 43, 'FT00002', 'GAM', 'FD00005615', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '사과드레싱', 'N', 'N', 10, 'FT00006', 'GAM', 'FD00014712', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '숙주나물', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012257', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '양배추샐러드', 'N', 'N', 65, 'FT00003', 'GAM', 'FD00012807', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000003', '암환자 식단', '암7찬D', '엑셀 임포트 (암7찬D)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000003';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '도토리묵무침', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00012583', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '숙주미나리무침', 'N', 'N', 80, 'FT00003', 'GAM', 'FD00012259', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '꽃맛살샐러드', 'N', 'N', 53, 'FT00003', 'GAM', 'FD00012984', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '오렌지드레싱', 'N', 'N', 18, 'FT00006', 'GAM', 'FD00014642', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000009', '고혈압 환자 식단', '고혈압7찬D', '엑셀 임포트 (당뇨7찬D)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000009';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '귤드레싱', 'N', 'N', 19, 'FT00006', 'GAM', 'FD00014628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '숙주나물', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012257', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '느타리배추국', 'Y', 'Y', 64, 'FT00002', 'GAM', 'FD00014629', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '양상추', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00014726', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '우엉고구마조림', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014630', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '조기구이', 'N', 'N', 33, 'FT00004', 'GAM', 'FD00008393', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '콩나물제육볶음', 'N', 'N', 109, 'FT00004', 'GAM', 'FD00010377', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000004', '저당 식단', '저당7찬D', '엑셀 임포트 (당뇨7찬D)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000004';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '귤드레싱', 'N', 'N', 19, 'FT00006', 'GAM', 'FD00014628', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '숙주나물', 'N', 'N', 33, 'FT00003', 'GAM', 'FD00012257', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '느타리배추국', 'Y', 'Y', 64, 'FT00002', 'GAM', 'FD00014629', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '양상추', 'N', 'N', 30, 'FT00003', 'GAM', 'FD00014726', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '우엉고구마조림', 'N', 'N', 72, 'FT00003', 'GAM', 'FD00014630', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '조기구이', 'N', 'N', 33, 'FT00004', 'GAM', 'FD00008393', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '콩나물제육볶음', 'N', 'N', 109, 'FT00004', 'GAM', 'FD00010377', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000005', '저염 식단', '저염7찬D', '엑셀 임포트 (저염7찬D)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000005';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '짜장소스', 'N', 'N', 146, 'FT00006', 'GAM', 'FD00013552', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '숙주미나리무침', 'N', 'N', 80, 'FT00003', 'GAM', 'FD00012259', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '미나리무침', 'N', 'N', 82, 'FT00003', 'GAM', 'FD00012358', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추샐러드', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00012807', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '사과드레싱', 'N', 'N', 10, 'FT00006', 'GAM', 'FD00014712', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

    INSERT INTO diet_mgmt (usr_id, std_cd, std_nm, diet_nm, diet_desc, diet_fav_flg, tray_id, tray_nm, rep_tray_cd, tray_mand_flg, cre_usr_id, upd_usr_id)
    VALUES (1, 'SD00000007', '고단백 식단', '고단백7찬D', '엑셀 임포트 (고단백7찬D)', 'N', NULL, '7찬 한식', 'D', 'Y', 1, 1)
    RETURNING diet_id INTO v_diet_id;
    INSERT INTO diet_std_dtl_mgmt (diet_id, nutr_cd, nutr_mand_flg, nutr_wgt_fm, nutr_wgt_to, nutr_foml)
    SELECT v_diet_id, tmpl_nutr_cd, tmpl_nutr_mand_flg, tmpl_nutr_wgt_fm, tmpl_nutr_wgt_to, tmpl_nutr_foml
    FROM tmpl_diet_std_dtl WHERE tmpl_std_cd = 'SD00000007';
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 1, '맑은순두부국', 'Y', 'Y', 98, 'FT00002', 'GAM', 'FD00014618', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 2, '코다리조림', 'N', 'N', 54, 'FT00004', 'GAM', 'FD00011534', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 3, '레몬탕수육', 'N', 'N', 106, 'FT00004', 'GAM', 'FD00011989', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 4, '(저염)쥬키니호박볶음', 'N', 'N', 66, 'FT00003', 'GAM', 'FD00014678', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 5, '달걀찜', 'N', 'N', 55, 'FT00004', 'GAM', 'FD00008216', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 6, '양배추샐러드', 'N', 'N', 45, 'FT00003', 'GAM', 'FD00012807', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 7, '사과드레싱', 'N', 'N', 10, 'FT00006', 'GAM', 'FD00014712', 1, 1);
    INSERT INTO diet_tray_dtl_mgmt (diet_id, fd_seq, fd_nm, fd_mand_flg, fd_sep_flg, fd_capa_vol, fd_tp_cd, unit_cd, fd_cd, cre_usr_id, upd_usr_id) VALUES (v_diet_id, 8, '쌀밥', 'Y', 'N', 75, 'FT00001', 'GAM', 'FD00000001', 1, 1);

END $$;