package egovframework.let.solution.dto;

import egovframework.com.cmm.dto.PagingType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SolutionContentDto implements PagingType {
	
	Long id;
	
	String title;
	
	String subTitle;
	
	String tag;
	
	String iconUrl;
	
	Long typeId;
	
	Object description;

}