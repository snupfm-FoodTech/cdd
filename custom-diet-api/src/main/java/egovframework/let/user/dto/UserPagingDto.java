package egovframework.let.user.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserPagingDto {
	
	private List<UserDto> users;
	
	private Integer totalPageNo;
	
	private Integer totalRecordNo;
}
