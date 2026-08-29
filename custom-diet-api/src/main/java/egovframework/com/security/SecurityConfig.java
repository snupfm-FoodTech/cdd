package egovframework.com.security;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import egovframework.com.cmm.util.AppUtil;
import egovframework.com.jwt.JwtAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${Globals.Allow.Origin}")
    private String allowedOrigins;
     @Bean
     public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
         return new JwtAuthenticationFilter();
     }
    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT","PATCH"));
        configuration.setAllowedOrigins(Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .collect(java.util.stream.Collectors.toList()));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Content-Disposition"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize ->
                                authorize.antMatchers(AppUtil.WHITE_LIST.stream().toArray(String[]::new)).permitAll()
                        .antMatchers(HttpMethod.GET, "/files/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/companies/view/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/companies/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/knowledges/view/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/knowledges/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/faqs/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/notices/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/commons/**").permitAll()
                        .antMatchers("/open/**").permitAll()
                        .anyRequest().authenticated()
                )
                .cors().and()
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}