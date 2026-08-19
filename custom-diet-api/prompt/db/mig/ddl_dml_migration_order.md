# DATABASE DDL/DML 실행 순서 정리 (SAMPLE 제외)

## 범위

- 포함: `DATABASE` 폴더 바로 아래 `.sql` 파일
- 제외: `DATABASE/SAMPLE` 폴더의 모든 `.sql`

## 1) 테이블 생성 순서 검증 결과

결론: 현재 파일 번호 순서(`01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07 -> 08 -> 09 -> 10 -> 11 -> 14 -> 15 -> 16 -> 99`)로 실행 시, FK 참조
기준 테이블 생성 순서 문제는 없습니다.

권장 DDL 실행 순서:

1. `DATABASE/01_common.sql`
2. `DATABASE/02_company.sql`
3. `DATABASE/03_knowledge.sql`
4. `DATABASE/04_nutrient.sql`
5. `DATABASE/05_material.sql`
6. `DATABASE/06_food.sql`
7. `DATABASE/07_food&mat.sql`
8. `DATABASE/08_mat&nutr.sql`
9. `DATABASE/09_diet.sql`
10. `DATABASE/10_food_recommend.sql`
11. `DATABASE/11_allergen.sql`
12. `DATABASE/14_consultation_management.sql`
13. `DATABASE/15_solution_management.sql`
14. `DATABASE/16_fd_recommend.sql`
15. `DATABASE/99_column_comment.sql` (컬럼 코멘트만 포함)

## 2) INSERT(Migration) 권장 순서

아래 순서는 FK/참조 관계 기준으로 안전한 순서입니다.

1. `DATABASE/01_common.sql`

- `com_intg_cd_hdr`
- `com_intg_cd_dtl` (위 header 데이터 필요)
- `role_mgmt`
- `perm_mgmt`
- `role_perm_mgmt` (role/perm 데이터 필요)

2. `DATABASE/02_company.sql`

- `co_tp_mgmt`

3. `DATABASE/04_nutrient.sql`

- `mst_nutr`

4. `DATABASE/05_material.sql`

- `tmpl_mat_tp`
- `mst_mat_eye_ref`

5. `DATABASE/09_diet.sql`

- `tmpl_diet_std`
- `tmpl_diet_std_dtl` (`tmpl_diet_std`, `mst_nutr` 필요)
- `tmpl_tray`
- `tmpl_tray_dtl` (`tmpl_tray` 필요)

6. `DATABASE/11_allergen.sql`

- `mst_alrg`

7. `DATABASE/14_consultation_management.sql`

- `com_intg_cd_hdr` (CD00016~CD00019)
- `com_intg_cd_dtl` (위 header 데이터 필요)
- `perm_mgmt` (`consult-requests`)
- `role_perm_mgmt` (기존 `role_mgmt` + 신규 `perm_mgmt` 필요)

8. `DATABASE/15_solution_management.sql`

- `perm_mgmt` (`solutions`)
- `role_perm_mgmt` (기존 `role_mgmt` + 신규 `perm_mgmt` 필요)
- `sol_tp_mgmt`
- `sol_ctnt_mgmt` (`sol_tp_mgmt` 데이터 필요)

## 3) 참고 사항

- `DATABASE/03_knowledge.sql`, `DATABASE/06_food.sql`, `DATABASE/07_food&mat.sql`, `DATABASE/08_mat&nutr.sql`,
  `DATABASE/10_food_recommend.sql`, `DATABASE/16_fd_recommend.sql`에는 기본 INSERT 구문이 없습니다.
- `DATABASE/99_column_comment.sql`은 DDL/DML 실행 후 마지막 단계에서 적용하는 것이 안전합니다.
- 일부 파일의 한글 데이터는 콘솔 인코딩에 따라 깨져 보일 수 있으므로, 실제 배포 시 SQL 파일 인코딩(UTF-8/CP949)을 확인 후 실행하는 것을 권장합니다.

---

## 작업 진행 내용

## 1) INSERT(Migration)

- co_mgmt (완료: Default Query)
- co_tp_mgmt (완료: Default Query)
- com_intg_cd_dtl (완료: Default Query)
- com_intg_cd_hdr (완료: Default Query)
- faq_mgmt (완료: Default Query)
- kwlg_mgmt (완료: Default Query)
- mst_alrg (완료: Default Query)
- mst_geo (완료: Default Query)
- mst_mat_eye_ref (완료: Default Query)
- mst_nutr (완료: Default Query)
- ntc_mgmt (완료: Default Query)
- perm_mgmt (완료: Default Query)
- role_mgmt (완료: Default Query)
- role_perm_mgmt (완료: Default Query)
- sol_ctnt_mgmt (완료: Default Query)
- sol_tp_mgmt (완료: Default Query)
- tmpl_diet_std (완료: Default Query)
- tmpl_diet_std_dtl (완료: Default Query)
- tmpl_mat_cat (완료: Default Query)
- tmpl_mat_rep (완료: Default Query)
- tmpl_mat_tp (완료: Default Query)
- tmpl_tray (완료: Default Query)
- tmpl_tray_dtl (완료: Default Query)
- usr_mgmt (완료: Default Query : ADMIN 계정)
- usr_role_mgmt (완료: Default Query : ADMIN 계정)

## 초기 데이터 필요 없음

- que_mgmt

## MIG 필요

- mst_fd
    - 기존 SAMPLE에 SQL 쿼리 있음
- tmpl_fd_wgt_vol
    - 기존 SAMPLE에 SQL 쿼리 있음
- mst_fd_nutr
    - 기존 SAMPLE에 SQL 쿼리 있음
- tmpl_fd
    - 기존 SAMPLE에 SQL 쿼리 있음
- tmpl_mat
    - 기존 SAMPLE에 SQL 쿼리 있음
- mst_mat
    - 기존 SAMPLE에 SQL 쿼리 있음
- tmpl_fd_rec
    - 기존 SAMPLE에 SQL 쿼리 있음
- tmpl_fd_rec_dtl
    - 기존 SAMPLE에 SQL 쿼리 있음
- tmpl_mat_alrg
    - 기존 SAMPLE에 SQL 쿼리 있음

### MIG 필요 대상 권장 실행 순서 (FK/데이터 의존성 반영)

사전 조건(이미 완료된 테이블):

- `tmpl_mat_rep`, `mst_mat_eye_ref` (for `mst_mat`)
- `mst_nutr` (for `tmpl_mat`)
- `mst_alrg` (for `tmpl_mat_alrg`)
- `tmpl_tray`, `tmpl_diet_std` (for `tmpl_fd_rec`)

실행 순서:

1. `mst_mat`
    - FK: `tmpl_mat_rep`, `mst_mat_eye_ref` 필요
    - 작업 내용
        - tmpl_mat_cat 데이터가 SAMPLE 쿼리와 불일치함으로, 다시 Import 수행 완료
        - tmpl_mat_rep 데이터가 SAMPLE 쿼리와 불일치함으로, 다시 Import 수행 완료
        - mst_mat_eye_ref 데이터가 SAMPLE 쿼리와 일치함으로, 기존 데이터 유지
        - mst_mat 데이터 적재 완료 (79796)
2. `mst_fd`
    - com_intg_cd_dtl 테이블의 'CD00013' 코드의 값과 매핑. SAMPLE 쿼리와 일치함으로 데이터 유지
    - 작업 내용
        - mst_fd 데이터 적재 완료 (14725)
3. `tmpl_fd_wgt_vol`
    - FK: `mst_fd`
    - 작업 내용
        - tmpl_fd_wgt_vol 데이터 적재 완료 (196)
4. `tmpl_mat`
    - FK: `mst_mat`, `mst_nutr`
    - `mst_nutr` 테이블의 데이터가 SAMPLE 쿼리와 일치함으로, 기존 데이터 유지
    - 작업 내용
        - tmpl_mat 데이터 적재 중 (527842)
5. `tmpl_fd`
    - FK: `mst_fd`, `mst_mat`
    - 작업 내용
        - tmpl_fd 데이터 적재 완료 (139820)
6. `tmpl_mat_alrg`
    - FK: `mst_mat`, `mst_alrg`
    - 내용 확인 결과, AS-IS 테이블에 미 존재
    - 작업 내용
        - tmpl_mat_alrg 데이터 적재 완료 (69070)
        - 추가적인 누락되었던 'R' 원재료 유형에 대한 데이터 적재 완료 (677 행 추가)
7. `tmpl_fd_rec`
    - FK: `tmpl_tray`, `tmpl_diet_std`
    - 작업 내용
        - tmpl_fd_rec 데이터 적재 완료 (128)
8. `tmpl_fd_rec_dtl`
    - FK: `mst_fd` (논리적으로 `tmpl_fd_rec.rec_id`와도 쌍으로 적재 권장)
    - 작업 내용
        - tmpl_fd_rec_dtl 데이터 적재 완료 (800)
9. `mst_fd_nutr`
    - FK: `mst_fd`
    - 권장: 최종 단계(식품/재료 매핑 데이터 적재 완료 후)
    - 작업 내용
        - mst_fd_nutr 데이터 적재 완료 (14725)
        - ~~TODO: alrg_ids 컬럼에 데이터 적재 필요 여부 검토~~
        - 해당 내용은 /api/diets/update-food-nutrition 엔드 포인트 호출을 통해 UPSERT 수행할 수 있음
        - 내용 처리 완료.
            - 14725 행 처리 완료. 이후 alrg_ids 컬럼에 데이터 업데이트 된 내용까지 확인 완료.

- fd_recommend
    - 작업 내용
        - fe_recommend 데이터 적재 완료 (16279220)
        - 적재 실패: C100600030 코드 찾을 수 없어 433건 실패
- tmpl_mat_geo
    - 모든 재료의 지리적 표시를 관리합니다.
    - 정보 테이블인데 현재 empty
    - Migration 필요
    - 베트남 디비: 1197 행 존재
    - 한국 디비: 1197 행 존재
    - 작업 내용
        - tmpl_mat_geo 데이터 적재 완료 (1197)

보완 권장:

- `tmpl_fd_rec_dtl.rec_id`는 현재 DB FK가 없으므로, 적재 전 `tmpl_fd_rec` 존재 여부를 검증하는 체크 쿼리 추가 권장
- 가능하면 각 단계별로 `COUNT`, 참조 무결성 검증 쿼리를 같이 실행

## SAMPLE SQL 쿼리 미존재 대상

- diet_alrg_mgmt
    - 행 1개 기존 데이터에 존재.
    - 테이블 정의서에 존재하지 않음
    - diet와 alrg_id, 사용자 매핑 기준으로 생성됨으로 보여짐
    - 사용자 데이터로 보여짐
- diet_fd_dtl_mgmt
    - 행 445개 기존 데이터에 존재.
    - 트레이의 하나의 음식에 포함된 모든 재료를 관리합니다.
    - 사용자 데이터로 보여짐
    - ADMIN 계정 데이터 존재함. 기본 Sample이 존재하는 듯
- diet_mgmt
    - 한 사용자가 소유한 모든 식단을 관리합니다.
- diet_nutr_smry
    - 식단 요약의 모든 영양 정보를 관리합니다.
    - 사용자 데이터로 보여짐
    - 식단 (diet_id)와 영양소 코드(nutr_cd) 매핑: 최종 영양소 양(nutr_fnl_amt)으로 구성된 테이블로 보여짐 + cre_usr
- diet_rct
    - 하나의 식단에 속한 모든 레시피 정보를 관리합니다.
    - 사용자 데이터로 보여짐
    - 레시피 (rct_id)와 식단 (diet_id) 매핑: 단가, 제공량, 조정 비율, 최종 가격으로 구성된 테이블로 보여짐 + cre_usr
- diet_std_dtl_mgmt
    - 식단에 속한 모든 식단 기준 세부 정보를 관리합니다.
    - 사용자 데이터로 보여짐
    - 식단 (diet_id)와 영양소 코드(nutr_cd) 매핑: 영양소 포함되어야 하는지 여부, 영양소 최소 무게량, 영양소 최대 무게량, 영양소 공식 으로 구성된 테이블로 보여짐 + cre_usr
- diet_tray_dtl_mgmt
    - 하나의 트레이에 속한 모든 세부 정보를 관리합니다.
    - 사용자 데이터로 보여짐
    - 식단 (diet_id)와 음식 순서(fd_seq) 매핑: 음식 필수 여부 플래그, 음식 분리 여부 플래그, 음식 용량, 음식 유형 코드, 단위 코드, 음식 코드, 음식 레시피 설명으로 구성된 테이블로
      보여짐 + cre_usr

- usr_fd_mgmt
- usr_tray_dtl_mgmt
- usr_tray_mgmt

## 무슨 테이블?

- csul_req_mgmt
    - 기존 엑셀 파일 안열림
- diet_accs
    - 하나의 식단에 속한 모든 부가 물품 관리
    - 기존 엑셀 파일 안열림
