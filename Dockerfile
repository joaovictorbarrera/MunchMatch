# Stage 1: Build React and Spring Boot
FROM node:20-bookworm AS build

RUN apt-get update && \
    apt-get install -y --no-install-recommends openjdk-17-jdk-headless && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN chmod +x gradlew && ./gradlew build -x test

# Stage 2: Run Spring Boot
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /app/server/build/libs/MunchMatch-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "exec java -jar app.jar --server.port=${PORT}"]
