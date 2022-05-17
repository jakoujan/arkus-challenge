package com.arkus.challenge.security;

import com.arkus.challenge.data.model.User;
import com.arkus.challenge.data.repository.UserRepository;
import java.util.Collection;
import java.util.Collections;

import com.arkus.challenge.service.SecurityServiceImpl;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class UserDetailsService implements ReactiveUserDetailsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsService.class);

    private UserRepository UserRepository;

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return this.UserRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(new UsernameNotFoundException("Usuario no encontrado")))
                .flatMap(u -> {
                    CustomUserDetails customUserDetails = new CustomUserDetails(u);
                    return Mono.just(customUserDetails);
                });
    }

    private static class CustomUserDetails extends User implements UserDetails {

        public CustomUserDetails(User user) {
            super(user);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        }

        @Override
        public String getPassword() {
            return super.getPassword();
        }

        @Override
        public String getUsername() {
            return super.getUsername();
        }

        @Override
        public boolean isAccountNonExpired() {
            return this.isActive();
        }

        @Override
        public boolean isAccountNonLocked() {
            return this.isActive();
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return this.isActive();
        }

        @Override
        public boolean isEnabled() {
            return this.isActive();
        }

    }
}
