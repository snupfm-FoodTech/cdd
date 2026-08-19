package egovframework.com.config.caching;

public interface CacheService {
	void saveEmailAuthNo(String email, String authNo);
	boolean verifyEmailAuthNo(String email, String authNo);
	void deleteEmlAuthNo(String email);
	void saveEmail(String email);
	boolean verifyEmail(String email);
	void deleteEmail(String email);
}