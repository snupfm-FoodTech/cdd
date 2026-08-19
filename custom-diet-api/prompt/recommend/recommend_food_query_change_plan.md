# `/diets/foods/recommend` 기능 변경 계획

## 1. 목표
- 기존 `mst_fd` 랜덤 조회 방식에서 `fd_recommend` 기반 추천 방식으로 전환한다.
- 추천 기준은 `fd_recommend.fd_cd`이며, 반환 데이터는 `recommend_fd_cd`에 대응되는 `mst_fd.fd_nm`을 포함한다.
- 정렬은 기존과 동일하게 `ORDER BY RANDOM()`을 유지한다.

## 2. 현재 구조(영향 범위)
- 컨트롤러: `src/main/java/egovframework/let/diet/web/EgovDietController.java`
  - `GET /diets/foods/recommend`
  - 현재 파라미터: `limit`, `foodTypeCode`
- 서비스 인터페이스: `src/main/java/egovframework/let/diet/service/EgovDietService.java`
  - `recommendFood(int limit, String fdTpCd)`
- 서비스 구현: `src/main/java/egovframework/let/diet/service/impl/EgovDietServiceImpl.java`
  - `validateFoodTypeCode` 후 DAO 호출
- DAO: `src/main/java/egovframework/let/diet/service/impl/DietDAO.java`
  - `recommendFood(int limit, String fdTpCd)`
- 매퍼: `src/main/resources/egovframework/mapper/let/diet/Diet_SQL_postgresql.xml`
  - `recommendFood` SQL: `mst_fd`에서 타입 조건 + 랜덤 + limit

## 3. 변경 방향
- 추천 기준 파라미터를 `foodTypeCode(fdTpCd)`에서 `foodCode(fdCd)`로 변경한다.
- `fdCd` 유효성은 기존 `validateFoodCode` 로직을 재사용한다.
- 매퍼 쿼리는 `fd_recommend`를 기준으로 조회 후 `mst_fd` 조인으로 `fd_nm`을 가져온다.

## 4. 상세 작업 계획

### 4.1 Controller 변경
- 대상: `src/main/java/egovframework/let/diet/web/EgovDietController.java`
- `/foods/recommend` 파라미터 변경:
  - 기존: `@RequestParam(name = "foodTypeCode") String fdTpCd`
  - 변경: `@RequestParam(name = "foodCode") String fdCd`
- 서비스 호출 시 인자도 `fdCd` 기준으로 변경한다.

검토 포인트:
- 프론트/외부 클라이언트가 이미 `foodTypeCode`를 사용 중이면 breaking change가 발생한다.
- 필요 시 과도기 대응:
  - 옵션 A: `foodCode`만 허용(명확하지만 즉시 호환성 깨짐)
  - 옵션 B: `foodCode` 우선 + `foodTypeCode` 임시 병행(하위호환, 이후 제거)

### 4.2 Service 인터페이스/구현 변경
- 대상:
  - `src/main/java/egovframework/let/diet/service/EgovDietService.java`
  - `src/main/java/egovframework/let/diet/service/impl/EgovDietServiceImpl.java`
- 메서드 시그니처 변경:
  - `recommendFood(int limit, String fdTpCd)` -> `recommendFood(int limit, String fdCd)`
- 검증 로직 변경:
  - 기존 `validateFoodTypeCode(List.of(fdTpCd))`
  - 변경 `validateFoodCode(List.of(fdCd))`
- DAO 호출 인자도 `fdCd` 기준으로 변경한다.

### 4.3 DAO 변경
- 대상: `src/main/java/egovframework/let/diet/service/impl/DietDAO.java`
- 메서드 시그니처 및 파라미터 맵 변경:
  - `fdTpCd` 키 제거
  - `fdCd` 키 추가
- MyBatis statement id(`DietDAO.recommendFood`)는 유지하여 변경 범위를 최소화한다.

### 4.4 Mapper SQL 변경
- 대상: `src/main/resources/egovframework/mapper/let/diet/Diet_SQL_postgresql.xml`
- `recommendFood` 쿼리를 아래 형태로 변경한다.

```sql
SELECT
    rec.recommend_fd_cd AS fd_cd,
    fd.fd_nm
FROM fd_recommend rec
INNER JOIN mst_fd fd
    ON fd.fd_cd = rec.recommend_fd_cd
WHERE rec.fd_cd = #{fdCd}
ORDER BY RANDOM()
LIMIT #{limit}
```

검토 포인트:
- `resultMap="diet_food_dto"` 기준으로 `fd_cd -> code`, `fd_nm -> name` 매핑은 그대로 동작한다.
- `LIMIT` 바인딩은 안전성 측면에서 `#{limit}` 사용을 우선 검토한다.
- 추천 데이터가 `limit`보다 적으면 가능한 건수만 반환된다(정상 동작).

## 5. 테스트 계획

### 5.1 단위/통합 시나리오
1. 정상 케이스
   - 입력: 유효한 `foodCode`, `limit=6`
   - 기대: 최대 6건, 각 항목에 `code(fd_cd)`, `name(fd_nm)` 존재
2. 존재하지 않는 `foodCode`
   - 기대: 서비스 검증에서 `diet-fd.code.invalid` 계열 오류
3. 추천 데이터가 없는 `foodCode`
   - 기대: 빈 배열 반환(200 OK)
4. `limit=1`, `limit` 경계값
   - 기대: 개수 제한 정상 동작

### 5.2 SQL 검증
- `fd_recommend.fd_cd` 인덱스(`idx_fd_recommend_fd_cd`) 사용 여부 확인
- `ORDER BY RANDOM()` 적용 상태 확인
- `recommend_fd_cd` 기준 `mst_fd` 조인 결과 누락 여부 확인

## 6. 배포/호환성 체크리스트
- API 파라미터 변경 공지(특히 `foodTypeCode -> foodCode`)
- OpenAPI/Swagger 스펙 확인(애노테이션 기반 노출값 점검)
- 프론트엔드 호출 파라미터 동기화
- 스테이징에서 샘플 `fd_recommend` 데이터로 사전 검증

## 7. 실행 순서 제안
1. 컨트롤러/서비스/DAO 시그니처 변경
2. 매퍼 SQL 변경
3. 컴파일 및 기본 API 호출 테스트
4. 호환성 전략(옵션 A/B) 확정 후 문서화
