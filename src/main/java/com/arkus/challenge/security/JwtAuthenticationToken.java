package com.arkus.challenge.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtAuthenticationToken extends AbstractAuthenticationToken  {

    private final Object principal;
    /**
     * Creates a token with the supplied array of authorities.
     *
     * @param authorities the collection of <tt>GrantedAuthority</tt>s for the principal
     *                    represented by this authentication object.
     */
    public JwtAuthenticationToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        setAuthenticated(true);
    }

    /**
     * @return 
     */
    @Override
    public Object getCredentials() {
        return this.getCredentials();
    }

    /**
     * @return 
     */
    @Override
    public Object getPrincipal() {
        return this.getPrincipal();
    }
}
