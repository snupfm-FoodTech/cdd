package egovframework.let.solution.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import egovframework.com.cmm.dto.PagingType;
import egovframework.com.cmm.util.DateTimeUtil;
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
public class SolutionTypeDto implements PagingType {

	Long id;
	
	String title;
	
	String description;
	
	String tag;
	
	String iconUrl;
	
	@JsonFormat(pattern = DateTimeUtil.DATE_TIME_FORMAT)
	LocalDateTime updatedDate;
}
