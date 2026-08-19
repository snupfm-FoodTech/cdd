CREATE TABLE kwlg_mgmt (
    kwlg_id serial PRIMARY KEY,
    kwlg_tit VARCHAR(1000) NOT NULL,
    kwlg_func_tp_cd VARCHAR(10) NOT NULL,
    kwlg_diet_tp_cd VARCHAR(10) NOT NULL,
    kwlg_view_qty INTEGER DEFAULT 0,
    kwlg_link_url VARCHAR(2084),
    kwlg_atch_url VARCHAR(2084),
    kwlg_aut VARCHAR(1000),
    cre_usr_id INTEGER NOT NULL,
    cre_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id INTEGER NOT NULL,
    upd_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

