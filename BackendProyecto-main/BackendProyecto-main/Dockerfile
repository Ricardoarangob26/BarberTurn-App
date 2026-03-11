
# Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
# Click nbfs://nbhost/SystemFileSystem/Templates/Other/Dockerfile to edit this template

# Usa una imagen de OpenJDK como base
FROM openjdk:17-jdk-slim

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo Maven Wrapper y el archivo de proyecto (pom.xml) al contenedor
COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn .mvn

# Copia todo el proyecto al directorio de trabajo
COPY src src

# Da permisos de ejecución al Maven Wrapper (en caso de estar en Linux)
RUN chmod +x mvnw

# Ejecuta Maven para empaquetar la aplicación
RUN ./mvnw clean package -DskipTests

# Copia el archivo JAR generado a la raíz del contenedor con el nombre app.jar
RUN cp target/*.jar app.jar

# Expone el puerto de la aplicación
EXPOSE 8090

# Ejecuta la aplicación
CMD ["java", "-jar", "app.jar"]
