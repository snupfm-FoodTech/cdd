package egovframework.com.config.caching;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.Cache;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.util.AppUtil;



@Service
public class CacheServiceImpl implements CacheService{
	private final CacheManager emlAuthNoCacheManager;
	private final CacheManager emlCacheMananger;
	private final Cache emlAuthNoCache;
	private final Cache emlCache;
	private final EgovMessageSource messageService;
	
	public CacheServiceImpl(@Qualifier(AppUtil.EML_AUTH_NO_CACHE) CacheManager emlAuthNoCacheManager, 
			@Qualifier(AppUtil.EML_CACHE) CacheManager emlCacheMananger, 
			@Autowired EgovMessageSource messageService) {
		this.emlAuthNoCacheManager = emlAuthNoCacheManager;
		this.emlCacheMananger = emlCacheMananger;
		this.emlAuthNoCache = getEmlAuthNoCache();
		this.emlCache = getEmlCache();
		this.messageService = messageService;
	}
	
	private Cache getEmlAuthNoCache() {
		Cache emlCache = emlAuthNoCacheManager.getCache(AppUtil.EML_AUTH_NO_CACHE);
		if (emlCache == null) {
			throw new CustomException("Cache " + AppUtil.EML_AUTH_NO_CACHE + " is null");
		}
		return emlCache;
	}
	
	private Cache getEmlCache() {
		Cache emlCache = emlCacheMananger.getCache(AppUtil.EML_CACHE);
		if (emlCache == null) {
			throw new CustomException("Cache " + AppUtil.EML_CACHE + " is null");
		}
		return emlCache;
	}

	@Override
	public void saveEmailAuthNo(String email, String authNo) {
		emlAuthNoCache.put(email, authNo);
	}

	@Override
	public boolean verifyEmailAuthNo(String email, String authNo) {
		ValueWrapper value = getEmlAuthNoCache().get(email);
		if (value == null) {
			//no email
			throw new CustomNotFoundException(messageService.get("auth.email-and-auth-no.incorrect", email));
		}
		String verificationCode =(String) value.get();
		if (verificationCode == null) {
			//no verification code
			throw new CustomNotFoundException(messageService.get("auth.auth-no.not-found", email));
		}
		return verificationCode.equals(authNo);
	}


	@Override
	public void deleteEmlAuthNo(String email) {
		emlAuthNoCache.evict(email);
	}

	@Override
	public void saveEmail(String email) {
		emlCache.put(email, 1);
	}

	@Override
	public boolean verifyEmail(String email) {
		return emlCache.get(email) != null;
	}

	@Override
	public void deleteEmail(String email) {
		emlCache.evict(email);
	}

}
