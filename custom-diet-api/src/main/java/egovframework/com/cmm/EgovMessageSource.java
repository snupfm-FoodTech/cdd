package egovframework.com.cmm;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

public class EgovMessageSource extends ReloadableResourceBundleMessageSource implements MessageSource {
	private final Locale locale = Locale.KOREAN;;

	private ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;

	public void setReloadableResourceBundleMessageSource(ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource) {
		this.reloadableResourceBundleMessageSource = reloadableResourceBundleMessageSource;
	}
	
	public ReloadableResourceBundleMessageSource getReloadableResourceBundleMessageSource() {
		return reloadableResourceBundleMessageSource;
	}

	public String get(String messageCode) {
		return getReloadableResourceBundleMessageSource().getMessage(messageCode, null, locale);
	}
	
	public String get(String messageCode, Object... params) {
		return getReloadableResourceBundleMessageSource().getMessage(messageCode, params, locale);
	}

}
