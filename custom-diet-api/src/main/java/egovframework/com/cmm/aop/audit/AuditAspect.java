package egovframework.com.cmm.aop.audit;

import java.time.LocalDateTime;
import java.util.List;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import egovframework.com.cmm.entity.BaseEntity;

@Component
@Aspect
public class AuditAspect {
	@Pointcut("@annotation(Audited)")
	public void audit() {}
	
	@Around(value = "audit()")
	public Object setAudit(ProceedingJoinPoint joinPoint) throws Throwable {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof Integer) {
			int id = (int) principal;
			Object[] args = joinPoint.getArgs();
			int argsLength = args.length;
			for (int i = 0 ; i < argsLength ; i++) {
				if (args[i] instanceof List<?> list) {
					list.forEach(item -> {
						if (item instanceof BaseEntity entity) {
							setAudit(entity, id);
						}
					});
				}
				if (args[i] instanceof BaseEntity entity) {
					setAudit(entity, id);
				}
			}
		}
		
		return joinPoint.proceed(joinPoint.getArgs());
	}
	
	private void setAudit(BaseEntity entity, int id) {
		entity.setCreUsrId(id);
		entity.setCreDt(LocalDateTime.now());
		entity.setUpdUsrId(id);
		entity.setUpdDt(LocalDateTime.now());
	}
}
