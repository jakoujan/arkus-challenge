package com.arkus.challenge.security;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JWTUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(JWTUtils.class);

    @Value("${jwt.secret}")
    private String SECRET;
    @Value("${jwt.expiration}")
    private Long EXPIRATION_TIME;

    public String generateToken(String username) {
        LOGGER.info("username: " + username);
        Date now = new Date();
        Map<String, Object> claims = new HashMap<>();

        claims.put("alg", "HS256");
        claims.put("typ", "JWT");

        return Jwts.builder().setSubject(username)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + EXPIRATION_TIME * 1000))
                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encode(SECRET.getBytes()))
                .setHeaderParams(claims)
                .compact();
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(Base64.getEncoder().encode(SECRET.getBytes()))
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimsFromToken(token).getExpiration();
    }

    public boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }

    public boolean isTokenValidated(String token) {
        return !isTokenExpired(token);
    }

    public boolean isTokenNonExpired(String token) {
        return !getExpirationDateFromToken(token).before(new Date());
    }
}
