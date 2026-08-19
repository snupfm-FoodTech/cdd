TRUNCATE TABLE mst_fd_nutr;

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