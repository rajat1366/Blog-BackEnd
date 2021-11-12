package com.sdp.Blog.security.jwt;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LogManager.getLogger(AuthEntryPointJwt.class);
    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException authException) throws IOException, ServletException {
        logger.error("[Unauthorized ACCESS] - message: "+ authException.getMessage());
        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
}
