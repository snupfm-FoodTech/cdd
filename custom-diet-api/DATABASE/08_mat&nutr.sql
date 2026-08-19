CREATE TABLE tmpl_mat (
    tmpl_mat_cd VARCHAR(10),
    tmpl_nutr_cd VARCHAR(10),
	tmpl_mat_wgt NUMERIC(10, 3) NOT NULL,
	tmpl_mat_unit_cd VARCHAR(10) NOT NULL,
    tmpl_nutr_amt NUMERIC(20, 10) NOT NULL,
	cre_usr_id integer NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id integer NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tmpl_mat_cd, tmpl_nutr_cd),
    FOREIGN KEY (tmpl_mat_cd) REFERENCES mst_mat(mat_cd) ON DELETE CASCADE, 
    FOREIGN KEY (tmpl_nutr_cd) REFERENCES mst_nutr(nutr_cd) ON DELETE CASCADE 
);
