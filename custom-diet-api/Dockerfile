# Build stage
FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app

# 의존성 캐싱 (pom.xml 변경이 없으면 이 레이어는 재사용됨)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 소스 복사 및 빌드
COPY . .
RUN mvn clean package -DskipTests -B

# Runtime stage
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# JAR 파일 와일드카드 복사
COPY --from=builder /app/target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
