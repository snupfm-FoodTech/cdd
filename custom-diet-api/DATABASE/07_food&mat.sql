CREATE TABLE tmpl_fd (
    tmpl_fd_cd VARCHAR(10),
    tmpl_mat_cd VARCHAR(10),
    tmpl_mat_rcp_wgt NUMERIC(10, 3),
    tmpl_mat_calc_wgt NUMERIC(10, 3),
    PRIMARY KEY (tmpl_fd_cd, tmpl_mat_cd),
    FOREIGN KEY (tmpl_fd_cd) REFERENCES mst_fd(fd_cd) ON DELETE CASCADE, 
    FOREIGN KEY (tmpl_mat_cd) REFERENCES mst_mat(mat_cd) ON DELETE CASCADE 
);
