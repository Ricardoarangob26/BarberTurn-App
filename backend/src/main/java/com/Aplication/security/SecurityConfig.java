package com.Aplication.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http)).csrf(csrf -> csrf.disable()) // Se maneja CORS y se deshabilita CSRF por ser API REST
                .authorizeHttpRequests(authz -> authz
                        // Endpoints públicos
                        .requestMatchers("/api/user/cliente/post").permitAll() // Registro de cliente
                        .requestMatchers("/api/user/barbero/post").permitAll() // Registro de barbero
                        .requestMatchers("/api/auth/login").permitAll() // Login unificado (lo crearemos)
                        .requestMatchers("/api/barberias/**").permitAll() // Ver barberías
                        .requestMatchers("/api/local/**").permitAll() // Ver locales
                        // Cualquier otra request requiere autenticación
                        .anyRequest().authenticated()
                )
                // Usaremos JWT, así que la sesión debe ser stateless (sin estado)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Añadir nuestro filtro JWT antes del filtro de validación de usuario y contraseña tradicional
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Bean para inyectar y usar AuthenticationManager en el controlador de Login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Por ahora, como las contraseñas en bd están sin encriptar, usaremos un PasswordEncoder temporal que no hace nada.
    // NOTA PARA EL FUTURO: Cambiar a BCryptPasswordEncoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); 
    }

    // Configuración global de CORS por si es requerida por Spring Security
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); 
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://barberturn.netlify.app"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
