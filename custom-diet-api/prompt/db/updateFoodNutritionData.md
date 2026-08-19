# updateFoodNutritionData() 기능 분석

## 1. 개요

`updateFoodNutritionData()`는 **식품 영양 마스터 데이터(`mst_fd_nutr`)를 최신 상태로 동기화**하는 관리자 전용 배치성 API이다.

템플릿 테이블(`tmpl_fd`, `tmpl_mat`)의 원본 데이터를 기반으로 각 식품(food)별 영양소 합산값을 재계산하여, `mst_fd_nutr` 테이블에 신규 삽입(Insert) 또는 갱신(Update)을 수행한다.

## 2. API 엔드포인트

| 항목 | 값 |
|------|-----|
| Method | `POST` |
| URL | `/api/diets/update-food-nutrition-data` |
| 인증 | Bearer Token (JWT) |
| 권한 | `ADM` (관리자) 역할 필수 |
| 요청 Body | 없음 |
| 응답 | `ResponseDto` ("OK", 200) |

## 3. 실행 흐름

```
[클라이언트 요청]
      │
      ▼
EgovDietController.updateFoodNutritionData()
      │  @Authorized 어노테이션으로 기본 권한 검사
      ▼
EgovDietServiceImpl.updateFoodNutritionData()
      │
      ├─ (1) 관리자 권한 검증
      │      RoleDAO.findAllRoleByUserId(userId)
      │
      ├─ (2) Upsert 대상 데이터 조회
      │      DietDAO.findFoodNutritionDataForUpsert()
      │
      ├─ (3) flag 기준으로 분리
      │      "U" → 업데이트 대상 리스트
      │      "I" → 삽입 대상 리스트
      │
      ├─ (4) 업데이트 실행 (flag = "U")
      │      DietDAO.updateFoodNutritionData(updatedList)
      │
      └─ (5) 삽입 실행 (flag = "I")
             DietDAO.insertFoodNutritionData(insertedList)
```

## 4. 각 DAO 호출 상세

---

### 4.1 RoleDAO.findAllRoleByUserId(userId)

**목적:** 현재 로그인한 사용자가 관리자(ADM) 역할을 보유하고 있는지 확인한다.

**매퍼 ID:** `RoleDAO.findAllRoleByUserId`

**SQL:**
```sql
SELECT *
FROM role_mgmt a
INNER JOIN usr_role_mgmt b ON a.role_id = b.role_id
WHERE b.usr_id = #{usrId}
```

**관련 테이블:**
| 테이블 | 설명 |
|--------|------|
| `role_mgmt` | 역할 마스터 (role_id, role_cd, role_desc) |
| `usr_role_mgmt` | 사용자-역할 매핑 테이블 |

**반환값:** `List<RoleEntity>` - 사용자에게 할당된 모든 역할 목록

**비즈니스 로직:**
- 반환된 역할 목록에서 `role_cd = 'ADM'`인 항목이 없으면 `CustomAuthorizationException` 발생
- `@Authorized` 어노테이션의 기본 권한 검사와 별개로 추가적인 관리자 검증 수행

---

### 4.2 DietDAO.findFoodNutritionDataForUpsert()

**목적:** 모든 식품의 영양소 데이터를 템플릿 원본으로부터 재계산하고, 기존 `mst_fd_nutr` 마스터와 비교하여 변경이 필요한 레코드만 추출한다.

**매퍼 ID:** `DietDAO.findFoodNutritionDataForUpsert`

**SQL 구조 (CTE 기반):**

```
WITH main AS (
    ┌─────────────────────────────────────────────┐
    │  서브쿼리 sub1: 식품별-재료별 영양소 피벗    │
    │                                             │
    │  mst_fd                                     │
    │    └─ LEFT JOIN tmpl_fd (식품-재료 매핑)     │
    │         └─ LEFT JOIN tmpl_mat (재료-영양소)  │
    │                                             │
    │  각 영양소 코드별 CASE WHEN으로 피벗:        │
    │  calc_wgt * nutr_amt / mat_wgt              │
    │  = 계산중량 기준 영양소 환산값               │
    └─────────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────┐
    │  main CTE: 식품별 영양소 합계               │
    │                                             │
    │  SUM(각 영양소)                              │
    │  + 4가지 비율 계산:                         │
    │    - sugar_calc_wgt_rto (당류/계산중량)      │
    │    - na_calc_wgt_rto (나트륨/계산중량)       │
    │    - eng_calc_wgt_rto (에너지/계산중량)      │
    │    - protein_eng_rto (단백질/에너지)         │
    │  + 알레르겐 ID 배열 집계 (ARRAY_AGG)        │
    └─────────────────────────────────────────────┘
)
              │
              ▼
    ┌─────────────────────────────────────────────┐
    │  최종 SELECT: 변경 감지                      │
    │                                             │
    │  main LEFT JOIN mst_fd_nutr                 │
    │                                             │
    │  WHERE:                                     │
    │    tmp.fd_cd IS NULL → flag = 'I' (신규)    │
    │    OR 어떤 컬럼이든 값이 다르면 → flag = 'U'│
    └─────────────────────────────────────────────┘
```

**관련 테이블:**

| 테이블 | 역할 | 설명 |
|--------|------|------|
| `mst_fd` | 원본 | 식품 마스터 (fd_cd, fd_tp_cd) |
| `tmpl_fd` | 원본 | 식품-재료 매핑 템플릿 (tmpl_fd_cd, tmpl_mat_cd, tmpl_mat_rcp_wgt, tmpl_mat_calc_wgt) |
| `tmpl_mat` | 원본 | 재료-영양소 매핑 템플릿 (tmpl_mat_cd, tmpl_nutr_cd, tmpl_nutr_amt, tmpl_mat_wgt) |
| `tmpl_mat_alrg` | 원본 | 재료-알레르겐 매핑 (mat_cd, alrg_id) |
| `mst_fd_nutr` | 대상 | 식품 영양 마스터 (비교 대상, Upsert 대상) |

**영양소 계산 공식:**
```
영양소값 = calc_wgt(계산중량) × nutr_amt(영양소량) / mat_wgt(재료중량)
```
- 각 재료별로 위 공식으로 영양소값을 산출한 뒤, 식품 단위로 SUM 집계

**계산되는 영양소 항목 (27개):**

| 코드 | 영양소명 | 코드 | 영양소명 |
|------|---------|------|---------|
| ENG | 에너지 (kcal) | VITA | 비타민 A |
| PROTEIN | 단백질 | RETI | 레티놀 |
| FAT | 지방 | CARO | 카로틴 |
| CHO | 탄수화물 | THIA | 티아민 (B1) |
| SUGAR | 당류 | RIBO | 리보플라빈 (B2) |
| FIBER | 식이섬유 | NIACIN | 나이아신 (B3) |
| CA | 칼슘 | VITC | 비타민 C |
| FE | 철분 | CHOLE | 콜레스테롤 |
| P | 인 | SFA | 포화지방산 |
| K | 칼륨 | TRANS | 트랜스지방 |
| NA | 나트륨 | MOIS | 수분 |
| ASH | 회분 | VITD | 비타민 D |

**추가 계산 비율 (4개):**

| 컬럼 | 계산식 | 설명 |
|------|--------|------|
| `sugar_calc_wgt_rto` | SUM(sugar) / SUM(calc_wgt) | 당류 / 총 계산중량 비율 |
| `na_calc_wgt_rto` | SUM(na) / SUM(calc_wgt) | 나트륨 / 총 계산중량 비율 |
| `eng_calc_wgt_rto` | SUM(eng) / SUM(calc_wgt) | 에너지 / 총 계산중량 비율 |
| `protein_eng_rto` | SUM(protein) / SUM(eng) | 단백질 / 에너지 비율 |

> 분모가 0인 경우 `CASE WHEN`으로 NULL 처리하여 division by zero 방지

**알레르겐 집계:**
```sql
SELECT ARRAY_AGG(DISTINCT matalrg.alrg_id ORDER BY matalrg.alrg_id)
FROM mst_fd fd
INNER JOIN tmpl_fd tmplfd ON fd.fd_cd = tmplfd.tmpl_fd_cd
INNER JOIN tmpl_mat_alrg matalrg ON tmplfd.tmpl_mat_cd = matalrg.mat_cd
WHERE fd.fd_cd = sub1.fd_cd
```
- 식품에 속한 모든 재료의 알레르겐 ID를 중복 제거 후 정렬된 배열로 집계

**변경 감지 (flag 결정):**
- `mst_fd_nutr`에 해당 `fd_cd`가 없으면 → `flag = 'I'` (Insert)
- `mst_fd_nutr`에 존재하지만 27개 영양소 + 4개 비율 + 식품유형코드 + 알레르겐 배열(`alrg_ids`) 중 하나라도 값이 다르면 → `flag = 'U'` (Update)
  - `alrg_ids` 비교 시 NULL 안전성을 위해 `IS DISTINCT FROM` 연산자 사용
- 완전히 동일하면 → 결과에서 제외 (WHERE 조건 미충족)

**반환값:** `List<DietFoodNutritionDto>` - Insert 또는 Update가 필요한 레코드 목록

---

### 4.3 DietDAO.updateFoodNutritionData(List<DietFoodNutritionDto>)

**목적:** 기존 `mst_fd_nutr` 레코드의 영양소 데이터를 최신 계산값으로 갱신한다.

**매퍼 ID:** `DietDAO.updateFoodNutritionData`

**SQL:**
```sql
-- <foreach>로 리스트의 각 항목마다 개별 UPDATE문 실행 (세미콜론 구분)
UPDATE mst_fd_nutr
SET
    fd_tp_cd = #{item.fdTpCd},
    ttl_rcp_wgt = #{item.ttlRcpWgt}::numeric,
    ttl_calc_wgt = #{item.ttlCalcWgt}::numeric,
    eng = #{item.eng}::numeric,
    protein = #{item.protein}::numeric,
    -- ... (27개 영양소 + 4개 비율 전체 업데이트)
    alrg_ids = #{item.allergenIds}  -- 배열 타입, 커스텀 TypeHandler 사용
WHERE fd_cd = #{item.fdCd}
```

**특이사항:**
- `<foreach separator=";">`로 다수의 UPDATE문을 세미콜론으로 연결하여 배치 실행
- `::numeric` 캐스팅으로 PostgreSQL의 정확한 숫자 타입 보장
- `alrg_ids` 컬럼은 PostgreSQL 배열 타입이며, `JdbcArrayAndJavaListTypeHandler`로 `List<Integer>` ↔ `int[]` 변환 처리

---

### 4.4 DietDAO.insertFoodNutritionData(List<DietFoodNutritionDto>)

**목적:** `mst_fd_nutr` 테이블에 새로운 식품 영양 데이터를 삽입한다.

**매퍼 ID:** `DietDAO.insertFoodNutritionData`

**SQL:**
```sql
INSERT INTO mst_fd_nutr
    (fd_cd, fd_tp_cd, ttl_rcp_wgt, ttl_calc_wgt,
     eng, protein, fat, cho, sugar, fiber, ca, fe,
     p, k, na, vita, reti, caro, thia, ribo, niacin, vitc,
     chole, sfa, trans, mois, ash, vitd,
     sugar_calc_wgt_rto, na_calc_wgt_rto, eng_calc_wgt_rto, protein_eng_rto,
     alrg_ids)
VALUES
    (#{item.fdCd}, #{item.fdTpCd}, ...) -- foreach로 멀티 VALUES
```

**특이사항:**
- `<foreach separator=",">`로 다수의 레코드를 하나의 INSERT문으로 일괄 삽입
- DAO 내부에서 `insert()` 대신 `update()` 메서드를 사용 (MyBatis에서 DML 실행 시 공통 패턴)

## 5. 데이터 모델 (DietFoodNutritionDto)

```java
public class DietFoodNutritionDto {
    private String flag;                 // 'U' (Update) 또는 'I' (Insert)
    private String fdCd;                 // 식품 코드 (PK)
    private String fdTpCd;               // 식품 유형 코드
    private Double ttlRcpWgt;            // 총 레시피 중량
    private Double ttlCalcWgt;           // 총 계산 중량
    private BigDecimal eng;              // 에너지
    private BigDecimal protein;          // 단백질
    private BigDecimal fat;              // 지방
    private BigDecimal cho;              // 탄수화물
    private BigDecimal sugar;            // 당류
    private BigDecimal fiber;            // 식이섬유
    private BigDecimal ca;               // 칼슘
    private BigDecimal fe;               // 철분
    private BigDecimal p;                // 인
    private BigDecimal k;                // 칼륨
    private BigDecimal na;               // 나트륨
    private BigDecimal vita;             // 비타민 A
    private BigDecimal reti;             // 레티놀
    private BigDecimal caro;             // 카로틴
    private BigDecimal thia;             // 티아민
    private BigDecimal ribo;             // 리보플라빈
    private BigDecimal niacin;           // 나이아신
    private BigDecimal vitc;             // 비타민 C
    private BigDecimal chole;            // 콜레스테롤
    private BigDecimal sfa;              // 포화지방산
    private BigDecimal trans;            // 트랜스지방
    private BigDecimal mois;             // 수분
    private BigDecimal ash;              // 회분
    private BigDecimal vitd;             // 비타민 D
    private BigDecimal sugarCalcWgtRto;  // 당류/계산중량 비율
    private BigDecimal naCalcWgtRto;     // 나트륨/계산중량 비율
    private BigDecimal engCalcWgtRto;    // 에너지/계산중량 비율
    private BigDecimal proteinEngRto;    // 단백질/에너지 비율
    private List<Integer> allergenIds;   // 알레르겐 ID 배열
}
```

## 6. 테이블 관계도

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│  mst_fd  │──1:N─│ tmpl_fd  │──N:1─│ tmpl_mat │
│ (식품)   │      │ (식품-   │      │ (재료-   │
│          │      │  재료    │      │  영양소) │
│ fd_cd    │      │  매핑)   │      │          │
│ fd_tp_cd │      │          │      │ tmpl_mat_cd    │
└──────────┘      │tmpl_fd_cd│      │ tmpl_nutr_cd   │
                  │tmpl_mat_cd     │ tmpl_nutr_amt  │
                  │tmpl_mat_rcp_wgt│ tmpl_mat_wgt   │
                  │tmpl_mat_calc_wgt│              │
                  └──────────┘      └──────────┘
                        │
                        │ tmpl_mat_cd
                        ▼
                  ┌──────────────┐
                  │ tmpl_mat_alrg│
                  │ (재료-알레르겐│
                  │  매핑)       │
                  │              │
                  │ mat_cd       │
                  │ alrg_id      │
                  └──────────────┘

        ┌──────────────────────────────┐
        │         mst_fd_nutr          │
        │  (식품 영양 마스터 - 대상)    │
        │                              │
        │  fd_cd (PK)                  │
        │  fd_tp_cd                    │
        │  ttl_rcp_wgt, ttl_calc_wgt   │
        │  eng, protein, fat, ...      │
        │  sugar_calc_wgt_rto, ...     │
        │  alrg_ids (int[])            │
        └──────────────────────────────┘
```

## 7. 트랜잭션 및 에러 처리

- `@Transactional`: 전체 과정(조회 → 업데이트 → 삽입)이 하나의 트랜잭션으로 묶임
- 관리자가 아닌 경우 `CustomAuthorizationException` 발생 → HTTP 403
- 조회 결과가 없으면 아무 작업 없이 정상 종료 (idempotent)

## 8. 사용 시나리오

1. 관리자가 식품 마스터(`mst_fd`)나 재료 템플릿(`tmpl_fd`, `tmpl_mat`)의 원본 데이터를 수정한 후
2. 이 API를 호출하면 영양소 마스터(`mst_fd_nutr`)가 자동으로 최신 상태로 동기화됨
3. 변경된 레코드만 감지하여 처리하므로 불필요한 쓰기를 최소화
