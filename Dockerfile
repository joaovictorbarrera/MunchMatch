# Build React client
FROM node:20-bookworm-slim AS client-build
WORKDIR /app/client
COPY client/ ./
RUN npm install
RUN npm run build

# Build Spring Boot server
FROM eclipse-temurin:17-jdk AS server-build
WORKDIR /app
COPY server/ ./server/
COPY --from=client-build /app/server/src/main/resources/static/ ./server/src/main/resources/static/
WORKDIR /app/server
RUN chmod +x gradlew && ./gradlew build -x test

# Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=server-build /app/server/build/libs/MunchMatch-0.0.1-SNAPSHOT.jar app.jar
ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "exec java -jar app.jar --server.port=${PORT}"]
