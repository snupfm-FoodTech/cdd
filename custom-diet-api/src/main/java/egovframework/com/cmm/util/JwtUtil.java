package egovframework.com.cmm.util;


import java.util.Date;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.let.user.entity.UserEntity;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class JwtUtil {
	private final Algorithm algorithm;
	private final EgovMessageSource messageService;

	public JwtUtil(@Value("${Globals.jwt.secret}") String secretKey, @Autowired EgovMessageSource messageService) {
		this.algorithm = Algorithm.HMAC256(secretKey.getBytes());
		this.messageService = messageService;
	}

	public String getAccessToken(UserEntity user) {
		long accessTokenTime = 1800000L; // 30 minutes

		return JWT.create().withSubject(user.getUsrId().toString())
				.withExpiresAt(new Date(System.currentTimeMillis() + accessTokenTime)).sign(algorithm);
	}

	public String getRefreshToken(UserEntity user) {
		long refreshTokenTime = 864000000L; // : 10 days
		return JWT.create().withSubject(user.getUsrId().toString())
				.withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenTime)).sign(algorithm);
	}

	public int verifyToken(String token) {
		try {
			JWTVerifier verifier = JWT.require(algorithm).build();
			DecodedJWT decodedJWT = verifier.verify(token);
			return Integer.valueOf(decodedJWT.getSubject());
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new ValidationException(messageService.get("auth.token.invalid", e.getMessage()));
		}
	}

}