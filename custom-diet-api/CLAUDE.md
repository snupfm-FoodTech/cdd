# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

병원 환경에서 환자별 맞춤 식단 관리 시스템의 백엔드 API. eGovFramework 4.1.0 기반 Spring Boot 2.7.12 애플리케이션으로, PostgreSQL을 사용하며 MyBatis로 데이터 접근을 처리한다.

## Build & Run Commands

```bash
# 빌드
mvn clean install

# 실행 (기본 포트 8080, context path: /api)
mvn spring-boot:run

# 특정 프로파일로 실행
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Docker 빌드 & 실행
docker build -t diet-api .
docker run -p 8080:8080 diet-api
```

테스트는 현재 pom.xml에서 `skipTests=true`로 비활성화되어 있다.

## Architecture

**계층 구조:** Controller → Service(Interface) → ServiceImpl → DAO → MyBatis XML Mapper

**패키지 구조:**
- `egovframework.com` - 공통 모듈 (AOP, DTO, 예외처리, 설정, 보안, JWT)
- `egovframework.let` - 비즈니스 도메인 모듈 (auth, diet, user, company 등)

**각 도메인 모듈의 표준 구조:**
```
module/
├── dto/           # 응답용 DTO (접미사: Dto)
├── entity/        # DB 엔티티 (접미사: Entity, BaseEntity 상속)
├── param/         # 요청 파라미터 (접미사: Param)
├── service/
│   ├── Egov[Module]Service.java        # 서비스 인터페이스
│   └── impl/
│       ├── Egov[Module]ServiceImpl.java # 서비스 구현체
│       └── [Module]DAO.java            # DAO (EgovAbstractMapper 상속)
└── web/
    └── Egov[Module]Controller.java     # REST 컨트롤러
```

## Key Conventions

**네이밍:**
- Controller/Service: `Egov` 접두사 (예: `EgovDietController`, `EgovDietService`)
- DAO: 접미사 `DAO`, `EgovAbstractMapper` 상속
- DB 컬럼: snake_case 약어 사용 (`usr_id`, `cre_dt`, `upd_dt`). MyBatis가 camelCase로 자동 변환
- DI: Lombok `@RequiredArgsConstructor` 사용한 생성자 주입

**AOP 어노테이션:**
- `@Audited` - 감사 필드 자동 설정 (creUsrId, creDt, updUsrId, updDt)
- `@Authorized` - 메서드 실행 전 권한 검사 (HTTP method → action 매핑: GET→READ, DELETE→DELETE, 나머지→WRITE)

**트랜잭션:** `egovframework.let..impl.*Impl.*(..)` 패턴에 AOP로 선언적 트랜잭션 적용. 모든 ServiceImpl 메서드가 자동 트랜잭션.

**응답 형식:** 모든 API 응답은 `ResponseDto`로 래핑 (content, hasErrors, errors, timeStamp, statusCode)

**페이징:** 쿼리 파라미터 `page`, `limit`, `orderByField`, `isDesc`. SQL에서 `count(*) over()`, `ROW_NUMBER()` 사용.

## SQL Mapper

MyBatis XML 매퍼 위치: `src/main/resources/egovframework/mapper/let/[module]/`

DAO에서 메서드명이 매퍼의 namespace + id와 매핑된다.

## Database

PostgreSQL 사용. 스키마 초기화 SQL 파일: `DATABASE/` 디렉토리에 번호 순서대로 실행 (01_common.sql → 16_fd_recommend.sql).
샘플 데이터: `DATABASE/SAMPLE/`

## Authentication & Security

JWT 기반 인증. 로그인(`/api/auth/login`) → Bearer 토큰 발급 → `Authorization: Bearer <token>` 헤더로 전달.
RBAC: ADM(관리자), MEM(회원) 역할. 리소스별 READ/WRITE/DELETE 권한.

## API Documentation

Swagger UI: `http://localhost:8080/api/swagger-ui.html`
