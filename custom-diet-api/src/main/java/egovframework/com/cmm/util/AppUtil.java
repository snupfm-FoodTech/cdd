package egovframework.com.cmm.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Pattern;
import org.springframework.security.core.context.SecurityContextHolder;

import egovframework.com.cmm.validation.annotation.AdditionalField;
import javax.validation.ValidationException;
import lombok.experimental.UtilityClass;

@UtilityClass
public class AppUtil {
	public static final String API_PREFIX = "/api";
	public static final List<String> WHITE_LIST = List.of("/swagger-ui/**", "/v3/api-docs/**", "/auth/**");
	public static final String EML_AUTH_NO_CACHE = "emlAuthNoCache";
	public static final String EML_CACHE = "emlCache";
	public static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	public static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
	public static final String DIGITS_CHARS = "0123456789";
	public static final String SPECIAL_CHARS = "!@#$%^&*()-_=+[{]}|;:',<.>/?";
	public static final Random RANDOM = new Random();
	public static final String ENTITY_USER = "user";
	public static final String ENTITY_COMPANY = "company";
	public static final String ENTITY_KNOWLEDGE = "knowledge";
	public static final String ENTITY_NOTICE = "notice";
	public static final String ENTITY_USER_QUESTION = "user-question";
	public static final String ENTITY_SOLUTION_TYPE = "solution-type";
	public static final String ENTITY_SOLUTION_CONTENT = "solution-content";
	public static final List<String> ENTITY_LIST = List.of(ENTITY_USER, ENTITY_COMPANY, ENTITY_KNOWLEDGE, ENTITY_USER_QUESTION, ENTITY_NOTICE, 
			ENTITY_SOLUTION_TYPE, ENTITY_SOLUTION_CONTENT);

	public static final String CODE_KNOWLEDGE_FUNC_TYPE = "CD00008";
	public static final String CODE_COMPANY_SIZE = "CD00009";
	public static final String CODE_KNOWLEDGE_DIET_TYPE = "CD00011";
	public static final String CODE_UNIT_CD = "CD00012";
	public static final String CODE_FOOD_TYPE_CD = "CD00013";
	public static final String CODE_REP_TRAY_CD = "CD00015";
	public static final String CODE_FOOD_TECH = "CD00016";
	public static final String CODE_COMPANY_ADDRESS = "CD00017";
	public static final String CODE_SOLUTION_TYPE = "CD00018";
	public static final String CODE_SOLUTION_TARGET = "CD00019";
	
	public static final String UNIT_ML = "ML";
	public static final String UNIT_GAM = "GAM";
	
	public enum ROLE {
		ADM, //ADMIN
		MEM //MEMBER
	}
	
	public enum ACCT_STT {
		A, //ACTIVE
		D //DELETED
	}
	
	public enum USR_QUE_STT {
		O, //OPEN
		C //CLOSED
	}
	
	
	//MAIL TEMPLATES
	public static final String MAIL_TMPL_AUTH_NO = "mail-authentication-no";
	public static final String MAIL_TMPL_RESET_PWD = "mail-reset-password";
	
	//NUTRIENT ORDER
	public static final Map<String, Integer> NUTRIENT_ORDER_MAP = Map.ofEntries(
	        Map.entry("ENG", 1),
	        Map.entry("MOIS", 2),
	        Map.entry("NA", 3),
	        Map.entry("CHO", 4),
	        Map.entry("SUGAR", 5),
	        Map.entry("FIBER", 6),
	        Map.entry("FAT", 7),
	        Map.entry("TRANS", 8),
	        Map.entry("SFA", 9),
	        Map.entry("CHOLE", 10),
	        Map.entry("PROTEIN", 11),
	        Map.entry("CA", 12),
	        Map.entry("P", 13),
	        Map.entry("K", 14),
	        Map.entry("FE", 15),
	        Map.entry("ASH", 16),
	        Map.entry("VITA", 17),
	        Map.entry("RETI", 18),
	        Map.entry("CARO", 19),
	        Map.entry("VITD", 20),
	        Map.entry("THIA", 21),
	        Map.entry("RIBO", 22),
	        Map.entry("NIACIN", 23),
	        Map.entry("VITC", 24)
	    );

	/**
	 * Check whether the field exists in the table (not in the entity)
	 * @param fieldName 
	 * @param obj 
	 * @return true if the field exists. Otherwise it's false
	 */
	public static boolean doesFieldExist(String fieldName, Object obj) {
		ArrayList<Field> objFields = new ArrayList<>(Arrays.asList(obj.getClass().getDeclaredFields()));
		objFields.addAll(Arrays.asList(obj.getClass().getSuperclass().getDeclaredFields()));
		return objFields.stream().anyMatch(objField -> {
			if (objField.isAnnotationPresent(AdditionalField.class)) {
				return false;
			}
			return objField.getName().equals(fieldName);
		});
	}
	
	public static String convertEntityFieldToColumn(String fieldName) {
		if (fieldName == null) {
			return null;
		}
		return fieldName.replaceAll("([a-z])([A-Z]+)", "$1_$2")
                .toLowerCase();
	}
	
	public static String generateRandomAuthNo(int length) {
		StringBuilder sb = new StringBuilder(length);
		String chars = UPPERCASE_CHARS + LOWERCASE_CHARS + DIGITS_CHARS;
        for (int i = 0; i < length; i++) {
            sb.append(getRandomChar(chars));
        }
        return sb.toString();
	}
	
	public static String generateRandomPassword(int length) {
		if (length < 4) { //Password length must be greater than 4
			throw new ValidationException("비밀번호 길이는 4보다 커야 합니다");
		}
		
		StringBuilder strBuilder = new StringBuilder();
		String chars = UPPERCASE_CHARS + LOWERCASE_CHARS;
		
		for (int i = 0; i < length - 4; i++) {
			strBuilder.append(getRandomChar(chars));
		}
		strBuilder.append(getRandomChar(UPPERCASE_CHARS));
		strBuilder.append(getRandomChar(LOWERCASE_CHARS));
		strBuilder.append(getRandomChar(SPECIAL_CHARS));
		strBuilder.append(getRandomChar(DIGITS_CHARS));
		
        return strBuilder.toString();
	}
	
	public static char getRandomChar(String chars) {
		int randomIndex = RANDOM.nextInt(chars.length());
		return chars.charAt(randomIndex);
	}
		
	public static Integer[] convertPageAndLimit(Integer page, Integer limit) {
		if (page == null) { //page is null but limit may be null
			return new Integer[] {null, limit};
		}
		//if page not null => limit must not be null
		
		if (limit == null ) {
			limit = 10;
		}
		return new Integer[] {(page - 1) * limit, limit};
	}
	
    public static boolean isEntityValid(String name) {
    	return ENTITY_LIST.contains(name);
    }
    
    public static boolean isPasswordValid(String password) {
    	//password must contain at least 1 uppercase, 1 lowercase, 1 digit and 1 special character.
    	String regex = "^(?=.*[\\p{Ll}])(?=.*[\\p{Lu}])(?=.*\\p{N})(?=.*[@$!%*?&^#_~`()+={}\\[\\]|\\\\:;'\",.<>/-]).{8,}$";
		
	    Pattern pattern = Pattern.compile(regex);
	    return pattern.matcher(password).matches();
    }
    
    public static Integer getUserIdFromToken() {
    	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof Integer)){
        	return null;
        }
        return (Integer) principal;
    }
}