# `/diets/foods/recommend` 알러지 제외 필터(Query Parameter) 추가 개선 계획

## 1. 변경 목표
- 기존 추천 API(`GET /diets/foods/recommend`)에 `excludedAllergenIds: List<Integer>` Query Parameter를 추가한다.
- 전달된 알러지 ID를 포함한 음식은 추천 결과에서 제외한다.
- `excludedAllergenIds`는 필수값이 아니며, 미전달/null/빈 배열일 때는 기존 추천 로직과 동일하게 동작한다.
- 구현 패턴은 `findAllFood`의 알러지 제외 처리(검증 + MyBatis 조건절)를 재사용한다.

## 2. API 변경 방향
- 대상 엔드포인트: `GET /diets/foods/recommend`
- 기존 Query Parameter 유지:
  - `limit` (필수)
  - `foodCode` (필수)
- 신규 Query Parameter 추가:
  - `excludedAllergenIds` (선택)

예시 요청:

```http
GET /diets/foods/recommend?limit=6&foodCode=FD000123&excludedAllergenIds=1&excludedAllergenIds=4&excludedAllergenIds=7
```

선택 처리 규칙:
- `excludedAllergenIds` 미전달: 필터 미적용
- `excludedAllergenIds=[]` 또는 빈 값: 필터 미적용
- `excludedAllergenIds` 값 존재: 해당 알러지 포함 음식 제외

## 3. 영향 범위
- Controller: `src/main/java/egovframework/let/diet/web/EgovDietController.java`
- Service Interface: `src/main/java/egovframework/let/diet/service/EgovDietService.java`
- Service Impl: `src/main/java/egovframework/let/diet/service/impl/EgovDietServiceImpl.java`
- DAO: `src/main/java/egovframework/let/diet/service/impl/DietDAO.java`
- Mapper: `src/main/resources/egovframework/mapper/let/diet/Diet_SQL_postgresql.xml`

## 4. 상세 작업 계획

### 4.1 Controller 변경
- `/foods/recommend`를 `GET`으로 유지한다.
- 파라미터를 아래 형태로 확장한다.
  - 기존: `limit`, `foodCode`
  - 추가: `@RequestParam(required = false, name = "excludedAllergenIds") List<Integer> excludedAllergenIds`
- 서비스 호출 시 `excludedAllergenIds`를 함께 전달한다.

### 4.2 Service 변경
- 시그니처 변경:
  - `recommendFood(int limit, String fdCd)`
  - `recommendFood(int limit, String fdCd, List<Integer> excludedAllergenIds)`
- 기존 `foodCode` 검증(`validateFoodCode`) 유지
- `findAllFood`와 동일하게 `validateAllergenId(excludedAllergenIds)` 호출
  - null/empty는 검증 스킵
  - 유효하지 않은 알러지 ID는 기존 오류 체계(`diet-alrg.id.invalid`) 사용

### 4.3 DAO 변경
- 시그니처 변경:
  - `recommendFood(int limit, String fdCd)`
  - `recommendFood(int limit, String fdCd, List<Integer> excludedAllergenIds)`
- MyBatis 파라미터 맵에 `excludedAllergenIds` 추가

### 4.4 Mapper SQL 변경
- `recommendFood` 쿼리에 알러지 필터 조건 추가
- `findAllFood`와 동일한 패턴으로 `excludedAllergenIds` 존재 시에만 조건을 적용

```xml
<select id="recommendFood" resultMap="diet_food_dto">
    SELECT
        rec.recommend_fd_cd AS fd_cd,
        fd.fd_nm
    FROM fd_recommend rec
    INNER JOIN mst_fd fd
        ON fd.fd_cd = rec.recommend_fd_cd
    INNER JOIN mst_fd_nutr fdnutr
        ON fdnutr.fd_cd = rec.recommend_fd_cd
    WHERE rec.fd_cd = #{fdCd}
    <if test="excludedAllergenIds != null and !excludedAllergenIds.isEmpty()">
        AND (
            fdnutr.alrg_ids IS NULL
            OR NOT (
                fdnutr.alrg_ids &amp;&amp; #{excludedAllergenIds,
                    jdbcType=ARRAY,
                    javaType=java.util.List,
                    typeHandler=egovframework.com.config.mybatis.JdbcArrayAndJavaListTypeHandler}
            )
        )
    </if>
    ORDER BY RANDOM()
    LIMIT #{limit}
</select>
```

## 5. 호환성/배포 고려사항
- `GET` 엔드포인트는 유지하므로 기존 클라이언트 호환성 영향은 낮다.
- 신규 파라미터 `excludedAllergenIds`는 선택값이므로 미적용 클라이언트는 기존 동작을 유지한다.
- OpenAPI/Swagger 스펙에 Query Parameter 추가 반영 필요

## 6. 테스트 계획
1. `excludedAllergenIds` 미전달 시 기존 추천 결과와 동일한지 확인
2. `excludedAllergenIds=[]` 또는 빈 값일 때 필터가 적용되지 않는지 확인
3. `excludedAllergenIds` 전달 시 해당 알러지 포함 음식이 제외되는지 확인
4. 존재하지 않는 알러지 ID 전달 시 검증 오류가 반환되는지 확인
5. 필터 적용 후 결과가 0건일 때 빈 배열(200 OK) 반환 확인
6. `limit` 경계값과 동시 적용 시 결과 건수 제한 정상 동작 확인