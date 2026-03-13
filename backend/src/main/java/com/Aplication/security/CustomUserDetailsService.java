package com.Aplication.security;

import com.Aplication.modelo.UserBarbero;
import com.Aplication.modelo.UserCliente;
import com.Aplication.repository.UserBarberoRepository;
import com.Aplication.repository.UserClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserClienteRepository userClienteRepository;

    @Autowired
    private UserBarberoRepository userBarberoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try to find the user in Cliente table
        Optional<UserCliente> cliente = userClienteRepository.findByUsername(username);
        if (cliente.isPresent()) {
            return new User(
                    cliente.get().getUsername(),
                    cliente.get().getPassword(), // This will need to be encrypted in the DB eventually
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + cliente.get().getRol()))
            );
        }

        // Try to find the user in Barbero table
        Optional<UserBarbero> barbero = userBarberoRepository.findByUsername(username);
        if (barbero.isPresent()) {
            return new User(
                    barbero.get().getUsername(),
                    barbero.get().getPassword(), // This will need to be encrypted in the DB eventually
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + barbero.get().getRol()))
            );
        }

        throw new UsernameNotFoundException("Usuario no encontrado: " + username);
    }
}
