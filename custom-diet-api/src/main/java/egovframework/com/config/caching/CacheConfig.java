package egovframework.com.config.caching;

import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.github.benmanes.caffeine.cache.Caffeine;
import egovframework.com.cmm.util.AppUtil;


@Configuration
public class CacheConfig {
	
	@Primary
    @Bean(AppUtil.EML_AUTH_NO_CACHE)
    public CacheManager cacheManagera() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(AppUtil.EML_AUTH_NO_CACHE);
        cacheManager.setCaffeine(caffeineCacheBuilder(10));
        return cacheManager;
    }
    
    @Bean(AppUtil.EML_CACHE)
    public CacheManager cacheManagerb() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(AppUtil.EML_CACHE);
        cacheManager.setCaffeine(caffeineCacheBuilder(120));
        return cacheManager;
    }

    Caffeine<Object, Object> caffeineCacheBuilder(int min) {
        return Caffeine.newBuilder()
                       .expireAfterWrite(min, TimeUnit.MINUTES)
                       .maximumSize(1000);
    }
}