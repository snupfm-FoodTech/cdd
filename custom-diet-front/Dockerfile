# Build stage
FROM node:20-bullseye AS builder
WORKDIR /app

# 빌드 안정화: 외부 telemetry 호출/대화형 prompt 차단, Node 힙 확장
ENV NEXT_TELEMETRY_DISABLED=1 \
    CI=true \
    NODE_OPTIONS=--max-old-space-size=4096

# NEXT_PUBLIC_* 변수는 빌드 시점에 클라이언트 번들로 인라인되므로 ARG/ENV로 주입한다.
ARG NEXT_PUBLIC_BASE_PATH=""
ARG NEXT_PUBLIC_CD_SERVICE="/service-page"
ARG NEXT_PUBLIC_FEATURE_ALLERGEN="false"
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_CD_SERVICE=$NEXT_PUBLIC_CD_SERVICE \
    NEXT_PUBLIC_FEATURE_ALLERGEN=$NEXT_PUBLIC_FEATURE_ALLERGEN

# 의존성 캐싱 — 부가 네트워크 호출(audit/fund) 비활성화
COPY package*.json ./
RUN npm install --no-audit --no-fund

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# 실행에 필요한 파일만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/service-page ./service-page
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/server.js ./server.js

# Next.js (3000) + service-page Express (4000)
EXPOSE 3000 4000

CMD ["npm", "start"]
