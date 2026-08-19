package egovframework.com.jwt;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.AppUtil;
import egovframework.com.cmm.util.DateTimeUtil;
import egovframework.com.cmm.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	 @Autowired
	 private JwtUtil jwtUtil;

    @Override //로그인 이후 HttpServletRequest 요청할 때마다 실행(스프링의 AOP기능)
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
    	
    	res.setContentType(APPLICATION_JSON_VALUE);
    	String authorizationToken = req.getHeader(AUTHORIZATION);
        log.info("checking request...: {}", req.getRequestURL());

        if (authorizationToken != null && authorizationToken.startsWith("Bearer ")) {
            String token = authorizationToken.substring("Bearer ".length());
            try {
            	int id = jwtUtil.verifyToken(token);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                log.info("Token is valid");
                log.info("authentication: {} ", SecurityContextHolder.getContext().getAuthentication());
                chain.doFilter(req, res);
            } catch (Exception e) {
                log.error("Token is invalid: {}", e.getMessage());
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                new ObjectMapper().writeValue(res.getOutputStream(),
                        ResponseDto.builder()
                                .content(null)
                                .hasErrors(true)
                                .errors(List.of(e.getMessage()))
                                .timeStamp(DateTimeUtil.now())
                                .statusCode(HttpServletResponse.SC_UNAUTHORIZED)
                                .build());
            }
        } else {
          new ObjectMapper().writeValue(res.getOutputStream(),
          ResponseDto.builder()
                  .content(null)
                  .hasErrors(true)
                  .errors(List.of("Unauthorized"))
                  .timeStamp(DateTimeUtil.now())
                  .statusCode(HttpServletResponse.SC_UNAUTHORIZED)
                  .build());
        }
    }

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String path = request.getRequestURI().substring(AppUtil.API_PREFIX.length());

	    return path.startsWith("/swagger-ui") || path.startsWith("/v3/api-docs") 
	    		|| (path.startsWith("/auth") && !path.startsWith("/auth/self-update"))
	    		|| path.startsWith("/files") && request.getMethod().equals("GET")
	    		|| path.startsWith("/companies/view")
	    		|| path.startsWith("/companies") && request.getMethod().equals("GET")
	    		|| path.startsWith("/knowledges/view")
	    		|| path.startsWith("/knowledges") && request.getMethod().equals("GET")
	    		|| path.startsWith("/notices") && request.getMethod().equals("GET")
	    		|| path.startsWith("/faqs") && request.getMethod().equals("GET")
	    		|| path.startsWith("/commons") && request.getMethod().equals("GET")
	    		|| path.startsWith("/open")
	    		;
	}
}
