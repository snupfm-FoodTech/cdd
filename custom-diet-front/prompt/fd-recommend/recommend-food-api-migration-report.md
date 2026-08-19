# 음식 추천 API 호출부 변경 보고서

## 1. 개요
- **작업일**: 2026-02-15
- **브랜치**: `fix/user-tray-template`
- **목적**: 백엔드 API `GET /diets/foods/recommend`의 파라미터 변경(`foodTypeCode` → `foodCode`)에 맞춰 프론트엔드 호출부를 동기화한다.

## 2. 변경 배경
- 기존: `mst_fd` 테이블에서 `foodTypeCode`(음식 타입 코드) 기준으로 랜덤 추천
- 변경: `fd_recommend` 테이블에서 `foodCode`(음식 코드) 기준으로 유사 음식 추천
- 추천 기준이 **타입(카테고리)** 단위에서 **개별 음식** 단위로 세분화됨

## 3. 변경 파일 및 상세 내용

### 3.1 `src/api-client/diet.api.ts`
- **변경 위치**: `getRecommendFoods` 메서드 (line 146~164)
- **변경 내용**:
  - 파라미터 인터페이스: `foodTypeCode?: string` → `foodCode?: string`
  - 쿼리 파라미터 전송: `params.append('foodTypeCode', ...)` → `params.append('foodCode', ...)`

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 파라미터명 | `foodTypeCode` | `foodCode` |
| 쿼리스트링 키 | `foodTypeCode` | `foodCode` |

### 3.2 `src/hooks/diet.hook.ts`
- **변경 위치**: `useRecommendFoods` 훅 (line 203~221)
- **변경 내용**:
  - 훅 파라미터 인터페이스: `foodTypeCode?: string` → `foodCode?: string`
  - API 호출 시 전달 인자: `foodTypeCode` → `foodCode`

### 3.3 `src/app/(client)/(root)/diet-management/components/details/diet-search-recommend.tsx`
- **변경 위치**: `useRecommendFoods` 호출부 (line 49~53)
- **변경 내용**:
  - `foodTypeCode: selectedTrayItem.typeCode` → `foodCode: selectedTrayItem.code`
  - 기존에는 선택된 트레이 아이템의 **타입 코드**를 전달했으나, 변경 후 해당 아이템의 **음식 코드**를 직접 전달

## 4. 영향 범위
- 변경된 API를 호출하는 컴포넌트는 `DietSearchRecommend` 1곳
- 해당 컴포넌트는 식단 관리 화면에서 음식 변경 시 유사 음식 추천 목록을 표시하는 데 사용됨
- 응답 구조(`code`, `name`)는 동일하므로 UI 렌더링 로직 변경 없음

## 5. 검증 항목
- [ ] 식단 편집 화면에서 트레이 아이템 선택 시 추천 음식 목록이 정상 노출되는지 확인
- [ ] `foodCode` 파라미터가 쿼리스트링에 올바르게 포함되는지 네트워크 탭에서 확인
- [ ] 추천 결과가 없는 음식 코드 선택 시 빈 목록이 정상 표시되는지 확인
- [ ] 기존 `foodTypeCode` 파라미터가 더 이상 전송되지 않는지 확인
