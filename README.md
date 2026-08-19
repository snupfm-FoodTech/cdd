# custom-diet

맞춤형 식이 설계 서비스 monorepo.

## 구조

- `custom-diet-api/` — Spring Boot 기반 백엔드 API
- `custom-diet-front/` — Next.js 기반 프론트엔드

각 하위 프로젝트의 자세한 안내는 해당 디렉토리의 `README.md`를 참고하세요.

## History

원본 저장소:
- API: https://github.com/Selvas-AI/custom-diet-api (dev 브랜치 history 보존)
- Front: https://github.com/Selvas-AI/custom-diet-front (dev 브랜치 history 보존)

두 저장소는 `git subtree`로 본 monorepo에 병합되었으며, 각 프로젝트의 dev 브랜치 commit history가 유지됩니다.

# 실행 / 종료 명령어
해당 실행 종료 명령어는 해당 프로젝트의 경로에서 실행하시길 바랍니다.
ex. D:\diet\custom-diet>

## RUN

```
docker compose up -d
```

## Stop
```
docker compose down
```