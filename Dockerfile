# Stage 1: Build
FROM eclipse-temurin:17-jdk AS build

# Install Node.js 20 for the React client build
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# Build the React client (output goes to server/src/main/resources/static per vite.config.ts)
WORKDIR /app/client
RUN npm install
RUN npm run build

# Build the Spring Boot server JAR (includes client static files)
WORKDIR /app/server
RUN chmod +x gradlew
RUN ./gradlew build -x test

# Stage 2: Runtime
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /app/server/build/libs/MunchMatch-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE $PORT

CMD ["java", "-jar", "app.jar", "--server.port=${PORT}"]
