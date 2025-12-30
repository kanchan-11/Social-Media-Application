# Build stage
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-noble

WORKDIR /app

# Copy the jar file from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 5454

# Set default environment variables (can be overridden by docker-compose)
ENV ENV=dev \
    MYSQL_HOST=mysql \
    MYSQL_PORT=3306 \
    MYSQL_DATABASE=db_social_media \
    MYSQL_USER=social_media_user \
    MYSQL_PASSWORD=secure_password_123

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
