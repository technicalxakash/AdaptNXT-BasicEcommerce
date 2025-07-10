package com.BasicEcommerceApi.config;

import com.BasicEcommerceApi.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@Component
public  class JWTFilter extends OncePerRequestFilter {
    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHead = request.getHeader("Authorization");
        String token=null;
        String email = null;

        if(authHead!=null && authHead.startsWith("Bearer")){
            token =authHead.substring(7);
            email = jwtUtil.extractEmail(token);
            System.out.println(email);
        }


//       if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
//           UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);
//           try {
//               if( jwtUtil.validateToken(token,userDetails)){
//                   UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                   usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                   SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//               }
//           } catch (Exception e) {
//               throw new RuntimeException(e);
//           }
//
//       }

        if(email!=null && SecurityContextHolder.getContext().getAuthentication() == null) {
            SecretKey key = jwtUtil.keyGrab();
            Claims claims = jwtUtil.getClaims(token);
            email = claims.getSubject();
            String authorities = String.valueOf(claims.get("authorities"));

            List<GrantedAuthority> auths = AuthorityUtils
                    .commaSeparatedStringToAuthorityList(authorities);
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request,response);

    }

}
