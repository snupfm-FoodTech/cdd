# deploy/

`docker-compose`로 custom-diet 전체 스택(api + front + nginx)을 실행하기 위한 설정 모음.

## 파일 구성

| 파일/디렉토리 | 설명 | git 추적 여부 |
|---|---|---|
| `nginx.conf` | nginx 리버스 프록시 설정 (HTTPS, /api, /service-page 등) | ✅ |
| `application.properties.example` | api 서버 설정 템플릿 (시크릿 placeholder 포함) | ✅ |
| `front.env.example` | 프론트엔드 환경변수 템플릿 | ✅ |
| `application.properties` | 실제 api 설정 파일 (시크릿 포함) | ❌ (gitignored) |
| `front.env` | 실제 프론트엔드 환경변수 | ❌ (gitignored) |
| `ssl/` | SSL 인증서 디렉토리 (`certificate.crt`, `private.key`) | ❌ (.gitkeep만) |
| `log/` | api 로그가 저장되는 디렉토리 | ❌ (.gitkeep만) |

## 공유 환경변수 (`.env`)

DB 자격증명·공개 주소처럼 여러 컨테이너가 같이 쓰는 값은 저장소 루트의 `.env` 파일 한 곳에서 관리합니다. `docker compose`가 자동 로딩하며, `docker-compose.yml` 의 `${VAR:-기본값}` 치환과 `application.properties` 의 `${VAR:기본값}` 플레이스홀더가 동일한 키를 참조합니다.

| 변수 | 용도 | 미설정 시 기본값 |
|---|---|---|
| `POSTGRES_USER` | DB 계정 | `diet` |
| `POSTGRES_PASSWORD` | DB 비밀번호 | `diet` |
| `POSTGRES_DB` | DB 이름 | `diet` |
| `POSTGRES_HOST` | DB 호스트 | docker 스택 내부: `postgres` / 단독 실행: `localhost` |
| `POSTGRES_PORT` | DB 포트 | `5432` |
| `PUBLIC_URL` | 외부 공개 API URL | `http://localhost/api` |
| `CORS_ALLOW_ORIGIN` | CORS 허용 origin | `https://localhost` |

`.env` 가 없어도 위 기본값으로 스택은 기동되며, 운영 환경에서 값을 바꾸려면 루트의 `.env` 만 수정하면 됩니다.

## 최초 실행 절차

1. **설정 파일 준비**:
   ```bash
   cp .env.example .env                                          # 공유 환경변수 (DB 자격증명 등)
   cp deploy/application.properties.example deploy/application.properties
   cp deploy/front.env.example deploy/front.env
   # 각 파일을 열어 placeholder/시크릿(JWT, 메일 등)을 실제 값으로 채워 넣기
   ```

2. **SSL 인증서 배치**:
   `deploy/ssl/` 디렉토리에 다음 두 파일을 둡니다.
   - `certificate.crt`
   - `private.key`

   공인 도메인이라면 Let's Encrypt(Certbot) 사용 권장. 자체 서명 인증서로 임시 테스트도 가능 (브라우저 경고 발생).

3. **빌드 & 실행** (저장소 루트에서):
   ```bash
   docker compose up -d --build
   ```

4. **상태 확인**:
   ```bash
   docker compose ps
   docker compose logs -f
   ```

5. **종료**:
   ```bash
   docker compose down
   ```

## 포트

| 서비스 | 컨테이너 포트 | 호스트 노출 |
|---|---|---|
| nginx | 80, 443 | 80, 443 |
| custom-diet-api | 8080 | 8080 |
| custom-diet-front | 3000 (Next.js), 4000 (Express service-page) | 3000 |

> nginx가 `/api` → api(8080), `/` → front(3000), `/service-page/` 와 `/env.js` → front(4000)로 라우팅합니다. 외부에서는 nginx(443)를 통해서만 접근하는 것을 권장합니다.

## SSL 인증서 교체

- `deploy/ssl/certificate.crt`, `deploy/ssl/private.key` 두 파일을 새 인증서로 교체.
- 적용:
  ```bash
  docker compose restart nginx
  ```

## 도메인/IP 변경 시 체크리스트

- `deploy/nginx.conf` 의 `server_name` 값 조정 (필요 시).
- `deploy/front.env` 는 호스트 무관 (모든 client 호출이 same-origin 상대경로 `/api` 사용). 도메인이 바뀌어도 **front 재빌드 불필요**.
- 루트 `.env` 의 `PUBLIC_URL`, `CORS_ALLOW_ORIGIN` 갱신 후 `docker compose up -d` 로 재기동 (application.properties 직접 수정 불필요).

## front.env 구성

브라우저로 노출되는 호스트 의존 값은 더 이상 없습니다.

| 변수 | 용도 | 기본값 |
|------|------|--------|
| `BACKEND_INTERNAL_URL` | Next.js 서버 → BE 직통 (컨테이너 내부 주소) | `http://custom-diet-api:8080/api` |
| `CD_APP`, `CD_APP_ADMIN` | service-page → FE Next.js 네비게이션 (same-origin 상대경로) | `/`, `/cms/` |
| `NEXT_PUBLIC_CD_SERVICE` | Next.js → service-page 네비게이션 (same-origin 상대경로) | `/service-page` |
| `NEXT_PUBLIC_FEATURE_ALLERGEN` | 기능 플래그 | `false` |

브라우저는 항상 `<현재 host>/api` 로 BE 를 호출합니다. nginx 가 `/api` → BE 컨테이너로 라우팅합니다.
