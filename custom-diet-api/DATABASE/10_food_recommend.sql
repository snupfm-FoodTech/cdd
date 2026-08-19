------------------------------------------- FOOD NUTRITION DATA FOR RECOMMEND FOODS
CREATE TABLE tmpl_fd_rec (
	rec_id SMALLINT PRIMARY KEY,
    tmpl_tray_cd VARCHAR(10) NOT NULL,
	tmpl_std_cd VARCHAR(10) NOT NULL,
	fm_mon SMALLINT NOT NULL,
	to_mon SMALLINT NOT NULL,
	FOREIGN KEY (tmpl_tray_cd) REFERENCES tmpl_tray(tmpl_tray_cd),
	FOREIGN KEY (tmpl_std_cd) REFERENCES tmpl_diet_std(tmpl_std_cd)
);

CREATE TABLE tmpl_fd_rec_dtl (
	rec_id SMALLINT,
	rec_seq SMALLINT,
	fd_cd VARCHAR(10) NOT NULL,
	PRIMARY KEY (rec_id, rec_seq),
	FOREIGN KEY (fd_cd) REFERENCES mst_fd(fd_cd)
);

CREATE TABLE mst_fd_nutr (
    fd_cd VARCHAR(10) PRIMARY KEY,
    fd_tp_cd VARCHAR(10),
    ttl_rcp_wgt NUMERIC,
    ttl_calc_wgt NUMERIC,
    eng NUMERIC,
    protein NUMERIC,
    fat NUMERIC,
    cho NUMERIC,
    sugar NUMERIC,
    fiber NUMERIC,
    ca NUMERIC,
    fe NUMERIC,
    p NUMERIC,
    k NUMERIC,
    na NUMERIC,
    vita NUMERIC,
    reti NUMERIC,
    caro NUMERIC,
    thia NUMERIC,
    ribo NUMERIC,
    niacin NUMERIC,
    vitc NUMERIC,
    chole NUMERIC,
    sfa NUMERIC,
    trans NUMERIC,
    mois NUMERIC,
    ash NUMERIC,
    vitd NUMERIC,
    sugar_calc_wgt_rto NUMERIC,
    na_calc_wgt_rto NUMERIC,
    eng_calc_wgt_rto NUMERIC,
    protein_eng_rto NUMERIC,
    alrg_ids int4[],
    FOREIGN KEY (fd_cd) REFERENCES mst_fd (fd_cd)
);

CREATE INDEX xak1mst_fd_nutr ON mst_fd_nutr USING btree(fd_tp_cd, eng);
CREATE INDEX xak2mst_fd_nutr ON mst_fd_nutr USING btree(fd_tp_cd, sugar_calc_wgt_rto);
CREATE INDEX xak3mst_fd_nutr ON mst_fd_nutr USING btree(fd_tp_cd, na_calc_wgt_rto);
CREATE INDEX xak4mst_fd_nutr ON mst_fd_nutr USING btree(fd_tp_cd, eng_calc_wgt_rto);
CREATE INDEX xak5mst_fd_nutr ON mst_fd_nutr USING btree(fd_tp_cd, protein_eng_rto);
