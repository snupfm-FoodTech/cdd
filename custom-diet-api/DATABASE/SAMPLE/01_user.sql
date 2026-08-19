
--INSERT USERS --password = admin (use https://bcrypt-generator.com/ to encript passwords)
INSERT INTO usr_mgmt (usr_eml, usr_pwd, usr_nm, usr_phn_no, usr_lst_log_dt, usr_acct_sts_cd, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
VALUES
    ('admin', '$2a$10$75rL7DW3WfAm5EhRIf6LV.S2EXrmdYPpkkwA.kUrVIPzZ67X5KCde', 'Admin User', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);


--ADD ROLE TO ADMIN
INSERT INTO usr_role_mgmt (usr_id, role_id, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
VALUES
    (1, (select role_id from role_mgmt WHERE role_cd = 'ADM'), 1, current_timestamp, 1, current_timestamp)
;

--DUMMY DATA FOR USER --password = Test@1234
-- INSERT INTO usr_mgmt (usr_eml, usr_pwd, usr_nm, usr_phn_no, usr_lst_log_dt, usr_acct_sts_cd, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
-- VALUES
--     ('john.doe@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'John Doe', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('jane.smith@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Jane Smith', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('michael.johnson@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Michael Johnson', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('emily.davis@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Emily Davis', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('robert.brown@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Robert Brown', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('david.miller@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'David Miller', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('sarah.wilson@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Sarah Wilson', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('william.moore@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'William Moore', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('olivia.thomas@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Olivia Thomas', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('james.jones@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'James Jones', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('elizabeth.anderson@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Elizabeth Anderson', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('charles.thomas@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Charles Thomas', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('mary.garcia@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Mary Garcia', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('thomas.rodriguez@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Thomas Rodriguez', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('linda.wilson@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Linda Wilson', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
--     ('daniel.martinez@example.com', '$2a$10$2YF68pxxnD0e5Lgg8LHrROSfWfuq3cYlJWV6XrrdPC72gTAW2Nz/y', 'Daniel Martinez', '1234567890', CURRENT_TIMESTAMP, 'A', 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
-- ;


--ADD ROLES TO MEMBER
-- INSERT INTO usr_role_mgmt (usr_id, role_id, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
-- SELECT usr_id, (select role_id from role_mgmt where role_cd = 'MEM'), 1, current_timestamp, 1, current_timestamp
-- FROM usr_mgmt
-- WHERE usr_eml != 'admin'
-- ;
