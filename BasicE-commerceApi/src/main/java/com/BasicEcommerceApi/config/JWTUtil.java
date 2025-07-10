package com.BasicEcommerceApi.config;


import com.BasicEcommerceApi.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JWTUtil {
    private final String SECRET = "kjdcjkdsncksdkcdcbsuydbcusdbcudsbcusbdcudsbcuywegc";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());
    private final long EXPIRATION = 1000*60*60*60;

    public SecretKey keyGrab(){
        return key;
    }

    public String generateToken(String email, String role){
        return Jwts.builder()
                .setSubject(email)
                .claim("authorities",   "ROLE_" + role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token){
        Claims body = getClaims(token);
        return body.getSubject();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

//    public boolean validateToken(String email, UserDetails userDetails, String token ) {
//       return email.equals(userDetails.getUsername())&&isTokenExpired(token);
//    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token){
        return getClaims(token).getExpiration().before(new Date());
    }


}