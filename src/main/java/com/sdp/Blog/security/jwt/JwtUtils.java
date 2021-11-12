package com.sdp.Blog.security.jwt;

import com.sdp.Blog.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LogManager.getLogger(JwtUtils.class);

    @Value("${BMS.app.jwtSecret}")
    private String jwtSecret;

    @Value("${BMS.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("[JWT ERROR] - Invalid JWT signature: "+ e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("[JWT ERROR] - Invalid JWT token: "+ e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("[JWT ERROR] - JWT token is expired: "+ e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("[JWT ERROR] - JWT token is unsupported: "+ e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("[JWT ERROR] - JWT claims string is empty: "+ e.getMessage());
        }

        return false;
    }
}
