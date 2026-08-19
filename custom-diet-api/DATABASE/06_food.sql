------------ FOOD ----------------
CREATE TABLE mst_fd (
    fd_cd VARCHAR(10) PRIMARY KEY,
    fd_nm VARCHAR(50) NOT NULL,
    fd_tp_cd VARCHAR(10) NOT NULL,
    fd_rcp_desc VARCHAR(5000)
);

CREATE TABLE tmpl_fd_wgt_vol (
    fd_cd VARCHAR(10) PRIMARY KEY,
    pre_wgt_g SMALLINT NOT NULL,
    pst_vol_ml SMALLINT NOT NULL,
    pre_wgt_to_pst_vol_rto NUMERIC(11, 9) NOT NULL,
    pst_vol_to_pre_wgt_rto NUMERIC(11, 9) NOT NULL,
    FOREIGN KEY (fd_cd) REFERENCES mst_fd (fd_cd)
);
