package egovframework.com.jwt;


import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.DateTimeUtil;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
    	log.debug("get to JwtAuthenticationEntryPoint");

        ResponseDto responseDto =  ResponseDto
    	        .builder()
    	        .content(null)
    	        .hasErrors(true)
    	        .errors(List.of("Unauthorized"))
    	        .timeStamp(DateTimeUtil.now())
    	        .statusCode(HttpStatus.UNAUTHORIZED.value())
    	        .build();
        ObjectMapper mapper = new ObjectMapper();

        //Convert object to JSON string
        String jsonInString = mapper.writeValueAsString(responseDto);



        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON.toString());
        response.setCharacterEncoding("UTF-8");
        response.getWriter().println(jsonInString);
    }
}