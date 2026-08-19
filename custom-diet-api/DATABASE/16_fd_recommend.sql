CREATE TABLE fd_recommend (
    fd_cd VARCHAR(10),
    recommend_fd_cd VARCHAR(10),
    FOREIGN KEY (fd_cd) REFERENCES mst_fd(fd_cd) ON DELETE CASCADE,
    FOREIGN KEY (recommend_fd_cd) REFERENCES mst_fd(fd_cd) ON DELETE CASCADE,
    PRIMARY KEY (fd_cd, recommend_fd_cd)
);
CREATE INDEX idx_fd_recommend_fd_cd ON fd_recommend(fd_cd);