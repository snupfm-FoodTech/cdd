# 알러지(alrg) 기능 명세서

## 1. 목적
`diet_alrg_mgmt`, `mst_alrg`, `tmpl_mat_alrg`, `mst_fd_nutr.alrg_ids`를 사용하는 기능을 코드 기준으로 식별하고, 실제 검증 가능한 테스트 시나리오를 제공한다.

## 2. 범위
- Controller: `src/main/java/egovframework/let/diet/web/EgovDietController.java`
- Service: `src/main/java/egovframework/let/diet/service/impl/EgovDietServiceImpl.java`
- DAO: `src/main/java/egovframework/let/diet/service/impl/DietDAO.java`
- Mapper SQL: `src/main/resources/egovframework/mapper/let/diet/Diet_SQL_postgresql.xml`

## 3. 테이블별 기능 매핑 요약

| 테이블 | 사용 목적 | 주요 기능(API) | 읽기/쓰기 |
|---|---|---|---|
| `mst_alrg` | 알러지 마스터/ID 유효성 검증/알러지명 조회 | `GET /diets/allergens`, 식단 상세 조회, 알러지 ID 검증 | 읽기 |
| `diet_alrg_mgmt` | 식단별 제외 알러지 저장 | 식단 생성/수정/제외알러지 저장 API, 식단 상세 조회 | 읽기+쓰기 |
| `tmpl_mat_alrg` | 재료-알러지 매핑 | 식단 상세 내 재료 알러지 구성, 재료 필터, 알러지 음식 검증, 영양데이터 산출 | 읽기 |
| `mst_fd_nutr.alrg_ids` | 음식 영양 레코드의 알러지 배열 | 음식 검색 필터, 커스텀 추천 필터, 영양데이터 업데이트 | 읽기+쓰기 |

## 4. 기능 상세

### F1. 알러지 마스터 조회
- API: `GET /diets/allergens`
- Controller: `EgovDietController.getAllAllergen` (`:318`)
- Service: `EgovDietServiceImpl.getAllAllergen` (`:1521`)
- DAO/SQL:
  - `DietDAO.getAllAllergen` (`:395`)
  - SQL `getAllAllergen` (`Diet_SQL_postgresql.xml:3104`)
- 테이블:
  - `mst_alrg` 조회

### F2. 식단 상세에서 알러지 정보 조회
- API: `GET /diets/{dietId}`
- Controller: `EgovDietController.findDietDetailById` (`:60`)
- Service: `EgovDietServiceImpl.findDietDetailById` (`:326`)
- DAO/SQL:
  - `DietDAO.findDietDetailById` (`:65`)
  - SQL `findDietDetailById` (`Diet_SQL_postgresql.xml:226`)
- 테이블 사용:
  - `tmpl_mat_alrg` + `mst_alrg`: 각 재료/음식의 알러지 목록 구성 (`:499`, `:500`)
  - `diet_alrg_mgmt` + `mst_alrg`: 식단의 제외 알러지(`excluded_allergens`) 구성 (`:623`, `:624`)
  - `mst_alrg`: 식단 내 전체 알러지(`allergens`) 이름 매핑 (`:610`)

### F3. 식단 제외 알러지 저장/갱신
- API:
  - `POST /diets` (생성 시 `excludedAllergenIds`)
  - `PUT /diets/{dietId}` (수정 시 `excludedAllergenIds`)
  - `POST /diets/{dietId}/add-food-to-tray` (트레이 반영 시 `excludedAllergenIds`)
  - `POST /diets/{dietId}/save-excluded-allergen` (전용 저장)
- Service 핵심:
  - `addExcludedAllergenToDiet` (`EgovDietServiceImpl:1582`)
  - 내부 동작: 기존 삭제 후 재삽입
- DAO/SQL:
  - `deleteDietAlrgMgmtByDietId` -> SQL `DELETE FROM diet_alrg_mgmt` (`Diet_SQL_postgresql.xml:3125`)
  - `addNewDietAlrgMgmt` -> SQL `INSERT INTO diet_alrg_mgmt` (`Diet_SQL_postgresql.xml:3116`)
  - 조회 비교용 `getAllAllergenByDiet` (`Diet_SQL_postgresql.xml:3109`)
- 테이블 사용:
  - `diet_alrg_mgmt` 쓰기/조회
  - `mst_alrg` 조인 조회(이름 반환)

### F4. 알러지 ID 유효성 검증(공통)
- 사용 지점:
  - 식단 생성/수정, 음식 목록 조회, 재료 목록 조회, 알러지 음식 검증 등
- Service:
  - `validateAllergenId` (`EgovDietServiceImpl:292`)
- DAO/SQL:
  - `checkInvalidAllergenId` (`DietDAO:354`)
  - SQL `checkInvalidAllergenId` (`Diet_SQL_postgresql.xml:814`)
- 테이블 사용:
  - `mst_alrg` 존재 여부 검증

### F5. 음식 목록 알러지 필터
- API: `GET /diets/foods?excludedAllergenIds=...`
- Controller: `EgovDietController.findAllFood` (`:198`)
- Service: `EgovDietServiceImpl.findAllFood` (`:1260`)
- DAO/SQL:
  - `DietDAO.findAllFood` (`:230`)
  - SQL `findAllFood` (`Diet_SQL_postgresql.xml:2414`)
- 테이블 사용:
  - `mst_fd_nutr.alrg_ids` 배열 겹침 연산으로 제외 필터 적용
  - 조건: `fdnutr.alrg_ids IS NULL OR NOT (fdnutr.alrg_ids && :excludedAllergenIds)` (`:2428`, `:2450`)

### F6. 재료 목록 알러지 필터
- API:
  - `GET /diets/materials/paging?excludedAllergenIds=...`
  - `GET /diets/materials?excludedAllergenIds=...`
- Controller: `EgovDietController.findAllMaterialPaging` (`:230`), `findAllMaterial` (`:242`)
- Service: `EgovDietServiceImpl.findAllMaterialWithPaging` (`:1287`), `findAllMaterial` (`:1321`)
- DAO/SQL:
  - `DietDAO.findAllMaterial` (`:298`)
  - SQL `findAllMaterial` (`Diet_SQL_postgresql.xml:2529`)
- 테이블 사용:
  - `tmpl_mat_alrg` 존재 여부로 재료 제외
  - 조건: `NOT EXISTS (SELECT 1 FROM tmpl_mat_alrg ... AND alrg_id = ANY(:excludedAllergenIds))` (`:2593`)

### F7. 알러지 음식 검증(입력 재료 기준)
- API: `POST /diets/allergens/check-food`
- Controller: `EgovDietController.checkAllergenFood` (`:324`)
- Service: `EgovDietServiceImpl.checkAllergenFood` (`:1530`)
- DAO/SQL:
  - `DietDAO.findAllergenMaterialCode` (`:412`)
  - SQL `findAllergenMaterialCode` (`Diet_SQL_postgresql.xml:3130`)
- 테이블 사용:
  - `tmpl_mat_alrg`로 입력 재료의 알러지 포함 여부 판정 (`:3146`)
- 반환:
  - 알러지 충돌 음식 코드와 문제 재료 코드 목록

### F8. 식단 내 알러지 음식 자동 제거
- 직접 API:
  - `POST /diets/{dietId}/save-excluded-allergen`
- 간접 호출:
  - `POST /diets/{dietId}/add-food-to-tray`
  - `POST /diets/{dietId}/recommend-food`
- Service:
  - `removeAllergenFoodFromDiet` (`EgovDietServiceImpl:1018`)
  - 내부에서 `checkAllergenFood` 호출 후 충돌 음식 삭제
- 테이블 연관:
  - 판정은 `tmpl_mat_alrg` 기반(`findAllergenMaterialCode`)
  - 제외 기준은 `diet_alrg_mgmt`에 저장된 제외 알러지

### F9. 음식 추천(커스텀 추천 경로) 알러지 필터
- API: `POST /diets/{dietId}/recommend-food`
- Service: `EgovDietServiceImpl.recommendFoodByDietId` (`:835`)
- DAO/SQL:
  - `DietDAO.findCustomRecFood` (`:265`)
  - SQL `findCustomRecFood` (`Diet_SQL_postgresql.xml:1153`)
- 테이블 사용:
  - `mst_fd_nutr.alrg_ids`로 후보 음식 필터
  - 조건: `alrg_ids IS NULL OR NOT (alrg_ids && :excludedAllergenIds)` (쿼리 각 표준 분기에서 공통 적용)
- 참고:
  - 기본 추천 실패 시 커스텀 추천 경로에서 사용된다.

### F10. 음식 영양 데이터 갱신 시 알러지 배열 산출/저장
- API: `POST /diets/update-food-nutrition-data` (관리자 권한 필요)
- Controller: `EgovDietController.updateFoodNutritionData` (`:311`)
- Service: `EgovDietServiceImpl.updateFoodNutritionData` (`:1443`)
- DAO/SQL:
  - `findFoodNutritionDataForUpsert` (`Diet_SQL_postgresql.xml:2775`)
  - `updateFoodNutritionData` (`Diet_SQL_postgresql.xml:3043`)
  - `insertFoodNutritionData` (`Diet_SQL_postgresql.xml:3084`)
- 테이블 사용:
  - `tmpl_mat_alrg`에서 음식별 알러지 ID 배열(`alrg_ids`) 집계 (`:2831`)
  - `mst_fd_nutr.alrg_ids`에 업데이트/삽입 (`:3078`, `:3088`)

## 5. 실제 테스트 시나리오

### 공통 사전조건
- 인증 토큰 필요 (`@Authorized` API).
- 테스트 사용자 소유의 `dietId` 1개 준비.
- `mst_alrg`에 유효한 알러지 ID(예: `1`, `2`) 존재.

### T1. 알러지 마스터 조회 확인 (`mst_alrg`)
1. 요청: `GET /diets/allergens`
2. 기대결과: `{id, name}` 목록 반환, 빈 배열 아님.
3. 검증 SQL:
```sql
SELECT alrg_id, alrg_nm FROM mst_alrg ORDER BY alrg_id;
```

### T2. 제외 알러지 저장 확인 (`diet_alrg_mgmt`)
1. 요청: `POST /diets/{dietId}/save-excluded-allergen`
2. Body 예시:
```json
{
  "excludedAllergenIds": [1, 2]
}
```
3. 기대결과: 응답의 `excludedAllergens`에 `id=1,2` 포함.
4. 검증 SQL:
```sql
SELECT diet_id, alrg_id
FROM diet_alrg_mgmt
WHERE diet_id = :dietId
ORDER BY alrg_id;
```

### T3. 잘못된 알러지 ID 검증 (`mst_alrg`)
1. 요청: T2와 동일, 단 `excludedAllergenIds: [999999]`
2. 기대결과: 4xx, 메시지 `diet-alrg.id.invalid`
3. 근거: `checkInvalidAllergenId`가 `mst_alrg`에 존재하지 않는 ID를 검출.

### T4. 식단 상세 알러지 조회 확인 (`diet_alrg_mgmt`, `mst_alrg`, `tmpl_mat_alrg`)
1. 요청: `GET /diets/{dietId}`
2. 기대결과:
   - `excludedAllergens` 값이 `diet_alrg_mgmt`와 일치
   - `tray.foods[].materials[].allergens`가 재료 알러지 매핑과 일치

### T5. 음식 목록 알러지 필터 확인 (`mst_fd_nutr.alrg_ids`)
1. 요청: `GET /diets/foods?limit=20&excludedAllergenIds=1,2`
2. 기대결과: 반환 음식 코드들에 대해 `mst_fd_nutr.alrg_ids`가 `{1,2}`와 겹치지 않음.
3. 검증 SQL:
```sql
SELECT fd_cd, alrg_ids
FROM mst_fd_nutr
WHERE fd_cd IN (:returnedFoodCodes)
  AND alrg_ids && ARRAY[1,2]::int4[];
```
4. 기대값: 조회 결과 0건.

### T6. 재료 목록 알러지 필터 확인 (`tmpl_mat_alrg`)
1. 요청: `GET /diets/materials/paging?page=1&limit=20&excludedAllergenIds=1`
2. 기대결과: 반환 재료 코드들 중 `tmpl_mat_alrg.alrg_id=1` 매핑이 없어야 함.
3. 검증 SQL:
```sql
SELECT mat_cd, alrg_id
FROM tmpl_mat_alrg
WHERE mat_cd IN (:returnedMaterialCodes)
  AND alrg_id = 1;
```
4. 기대값: 조회 결과 0건.

### T7. 입력 음식 알러지 검증 확인 (`tmpl_mat_alrg`)
1. 요청: `POST /diets/allergens/check-food`
2. Body 예시:
```json
{
  "excludedAllergenIds": [1],
  "foods": [
    {
      "code": "FD00000001",
      "materials": [
        {"code": "MT00000001"},
        {"code": "MT00000002"}
      ]
    }
  ]
}
```
3. 기대결과: 알러지 충돌 시 해당 음식 코드와 재료 코드 반환.

### T8. 영양데이터 갱신 후 `alrg_ids` 반영 확인 (`tmpl_mat_alrg` -> `mst_fd_nutr`)
1. 요청: `POST /diets/update-food-nutrition-data` (관리자 계정)
2. 기대결과: `mst_fd_nutr.alrg_ids`가 재료 매핑 기준으로 채워짐/갱신됨.
3. 검증 SQL:
```sql
SELECT fd.fd_cd,
       (
         SELECT ARRAY_AGG(DISTINCT tma.alrg_id ORDER BY tma.alrg_id)
         FROM tmpl_fd tf
         JOIN tmpl_mat_alrg tma ON tf.tmpl_mat_cd = tma.mat_cd
         WHERE tf.tmpl_fd_cd = fd.fd_cd
       ) AS expected_alrg_ids,
       nutr.alrg_ids AS actual_alrg_ids
FROM mst_fd fd
JOIN mst_fd_nutr nutr ON nutr.fd_cd = fd.fd_cd
WHERE fd.fd_cd IN (:sampleFoodCodes);
```

## 6. 참고 사항
- `save-excluded-allergen`는 `excludedAllergenIds`가 `null`이면 `diet_alrg_mgmt` 변경을 수행하지 않는다.
- `excludedAllergenIds`가 빈 배열(`[]`)이면 기존 `diet_alrg_mgmt`를 삭제하고 신규 삽입은 하지 않는다.
- 추천 기능은 커스텀 추천 SQL에서 `mst_fd_nutr.alrg_ids`로 1차 필터링하고, 최종적으로 `removeAllergenFoodFromDiet`에서 재료 기준(`tmpl_mat_alrg`)으로 한 번 더 정리한다.
