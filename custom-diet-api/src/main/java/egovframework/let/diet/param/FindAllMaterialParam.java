package egovframework.let.diet.param;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FindAllMaterialParam {
	
	Integer offset;
	
	Integer limit;
	
	String keyword;
	
	List<String> matCdList;
	
	Integer representativeId;
	
	List<Integer> excludedAllergenIds;

}