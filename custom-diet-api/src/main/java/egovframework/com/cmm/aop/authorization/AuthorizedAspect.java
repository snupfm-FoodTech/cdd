package egovframework.com.cmm.aop.authorization;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import egovframework.com.cmm.exception.CustomAuthorizationException;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.user.service.EgovUserService;

import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@Aspect
@RequiredArgsConstructor
public class AuthorizedAspect {
	
	private final EgovUserService userService;
	
	@Pointcut("@annotation(Authorized)")
	public void authorize() {}
	
	@Around(value = "authorize()")
	public Object checkAuthorization(ProceedingJoinPoint joinPoint) throws Throwable {	
		//get request data
		RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
		if (attributes == null) {
			throw new CustomAuthorizationException("Forbidden");
		}
        HttpServletRequest request = ((ServletRequestAttributes) attributes).getRequest();
        String resource = pathToResource(request.getRequestURI());
        String action = methodToAction(request.getMethod());
        
        //check permission
        Integer id = AppUtil.getUserIdFromToken();
        if (id == null || userService.checkUserPermission(id, resource, action) == null) {
        	throw new CustomAuthorizationException("Forbidden");
        }
        
        //continue
		return joinPoint.proceed(joinPoint.getArgs());
	}
	
	private String methodToAction(String method) {
		switch (method) {
			case "GET":
				return "READ";
			case "DELETE":
				return "DELETE";
			default:
				return "WRITE";
		}
	}
	
	private String pathToResource(String path) {
		if (path == null) {
			return "";
		}
		return path.substring(AppUtil.API_PREFIX.length()).split("/")[1];
	}
}
