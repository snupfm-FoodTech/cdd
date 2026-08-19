
-- WITH temp3 AS (
--     SELECT usr_id as id
--     FROM usr_mgmt
--     WHERE usr_eml != 'admin'
--     LIMIT 1
--     )
-- INSERT INTO que_mgmt (que_sts_cd, que_usr_id, que_tit, que_ctnt, ans_usr_id, ans_ctnt, que_atch_url, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
-- VALUES
--     ('O', (SELECT id FROM temp3), '첫 번째 질문', '첫 번째 질문의 내용입니다.', 1, NULL, NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('C', (SELECT id FROM temp3), '두 번째 질문', '두 번째 질문의 내용입니다.', 1, '두 번째 질문에 대한 답변입니다.', NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('O', (SELECT id FROM temp3), '세 번째 질문', '세 번째 질문의 내용입니다.', 1, '세 번째 질문에 대한 답변입니다.', 'http://example.com/attachment3', (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('C', (SELECT id FROM temp3), '네 번째 질문', '네 번째 질문의 내용입니다.', NULL, NULL, NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('O', (SELECT id FROM temp3), '다섯 번째 질문', '다섯 번째 질문의 내용입니다.', 1, '다섯 번째 질문에 대한 답변입니다.', NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('O', (SELECT id FROM temp3), '여섯 번째 질문', '여섯 번째 질문의 내용입니다.', NULL, NULL, NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('C', (SELECT id FROM temp3), '일곱 번째 질문', '일곱 번째 질문의 내용입니다.', 1, '일곱 번째 질문에 대한 답변입니다.', 'http://example.com/attachment7', (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('O', (SELECT id FROM temp3), '여덟 번째 질문', '여덟 번째 질문의 내용입니다.', 1, '여덟 번째 질문에 대한 답변입니다.', NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('O', (SELECT id FROM temp3), '아홉 번째 질문', '아홉 번째 질문의 내용입니다.', 1, '아홉 번째 질문에 대한 답변입니다.', NULL, (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP),
--     ('C', (SELECT id FROM temp3), '열 번째 질문', '열 번째 질문의 내용입니다.', 1, '열 번째 질문에 대한 답변입니다.', 'http://example.com/attachment10', (SELECT id FROM temp3), CURRENT_TIMESTAMP, (SELECT id FROM temp3), CURRENT_TIMESTAMP);


INSERT INTO faq_mgmt (faq_que_ctnt, faq_ans_ctnt, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
VALUES
    ('Lorem Ipsum이란 무엇인가요?', 'Lorem Ipsum은 인쇄 및 조판 산업의 더미 텍스트입니다.', 1, current_timestamp, 1, current_timestamp),
    ('왜 사용하나요?', '페이지 레이아웃을 보고 있을 때 읽기 쉬운 콘텐츠에 의해 독자가 산만해질 수 있습니다.', 1, current_timestamp, 1, current_timestamp),
    ('어디에서 왔나요?', '흔히 알려진 것과 달리, Lorem Ipsum은 그저 무작위 텍스트가 아닙니다.', 1, current_timestamp, 1, current_timestamp),
    ('어디서 구할 수 있나요?', 'Lorem Ipsum 단락의 여러 가지 변형이 있지만 대부분은 어느 정도 변형을 겪었습니다.', 1, current_timestamp, 1, current_timestamp),
    ('Lorem Ipsum이란 무엇인가요?', 'Lorem Ipsum은 인쇄 및 조판 산업의 더미 텍스트입니다.', 1, current_timestamp, 1, current_timestamp),
    ('왜 사용하나요?', '페이지 레이아웃을 보고 있을 때 읽기 쉬운 콘텐츠에 의해 독자가 산만해질 수 있습니다.', 1, current_timestamp, 1, current_timestamp),
    ('어디에서 왔나요?', '흔히 알려진 것과 달리, Lorem Ipsum은 그저 무작위 텍스트가 아닙니다.', 1, current_timestamp, 1, current_timestamp),
    ('어디서 구할 수 있나요?', 'Lorem Ipsum 단락의 여러 가지 변형이 있지만 대부분은 어느 정도 변형을 겪었습니다.', 1, current_timestamp, 1, current_timestamp),
    ('Lorem Ipsum이란 무엇인가요?', 'Lorem Ipsum은 인쇄 및 조판 산업의 더미 텍스트입니다.', 1, current_timestamp, 1, current_timestamp),
    ('왜 사용하나요?', '페이지 레이아웃을 보고 있을 때 읽기 쉬운 콘텐츠에 의해 독자가 산만해질 수 있습니다.', 1, current_timestamp, 1, current_timestamp),
    ('어디에서 왔나요?', '흔히 알려진 것과 달리, Lorem Ipsum은 그저 무작위 텍스트가 아닙니다.', 1, current_timestamp, 1, current_timestamp),
    ('어디서 구할 수 있나요?', 'Lorem Ipsum 단락의 여러 가지 변형이 있지만 대부분은 어느 정도 변형을 겪었습니다.', 1, current_timestamp, 1, current_timestamp);


INSERT INTO ntc_mgmt (ntc_tit, ntc_ctnt, ntc_atch_url, cre_usr_id, cre_dt, upd_usr_id, upd_dt)
VALUES
    ('중요 공지', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'http://example.com/attachment1.pdf', 1, current_timestamp, 1, current_timestamp),
    ('서버 유지 보수 일정', '고객님들께 안내드립니다. 2024년 7월 1일에 예정된 유지 보수 작업이 있습니다.', NULL, 1, current_timestamp, 1, current_timestamp),
    ('새로운 기능 출시', '저희는 새로운 기능 출시 소식을 전해드립니다!', 'http://example.com/attachment2.docx', 1, current_timestamp, 1, current_timestamp),
    ('휴일 휴무 안내', '7월 4일은 독립 기념일로 인해 휴무입니다.', NULL, 1, current_timestamp, 1, current_timestamp),
    ('제품 업데이트', '최신 제품 업데이트로 성능이 향상되었습니다. 확인해주세요.', 'http://example.com/attachment3.jpg', 1, current_timestamp, 1, current_timestamp),
    ('보안 공지', '계정 보안을 유지하기 위해 정기적으로 비밀번호를 업데이트해 주세요.', NULL, 1, current_timestamp, 1, current_timestamp),
    ('시스템 업그레이드', '고객님을 더 잘 서비스하기 위해 시스템을 업그레이드 중입니다.', 'http://example.com/attachment4.txt', 1, current_timestamp, 1, current_timestamp),
    ('이벤트 알림', '7월 10일 예정된 이벤트를 놓치지 마세요!', NULL, 1, current_timestamp, 1, current_timestamp),
    ('제품 리콜 공지', '품질 문제로 XYZ 제품 일부를 리콜하게 되었습니다.', 'http://example.com/attachment5.pdf', 1, current_timestamp, 1, current_timestamp),
    ('새로운 이용 약관', '저희의 새로운 이용 약관이 적용되었습니다. 확인해 주세요.', NULL, 1, current_timestamp, 1, current_timestamp);