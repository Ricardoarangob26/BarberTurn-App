package com.Aplication.controller;

import com.Aplication.modelodto.JWTResponse;
import com.Aplication.modelodto.LoginRequest;
import com.Aplication.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) {
        try {
            // Spring Security uses the AuthenticationManager which uses our CustomUserDetailsService
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error en la autenticación: " + e.getMessage());
        }

        // Authentication successful, generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        // El Token expirará en 10 horas según la configuración de JwtUtil
        JWTResponse response = new JWTResponse(LocalDateTime.now().plusHours(10), jwt);

        return ResponseEntity.ok(response);
    }
}
