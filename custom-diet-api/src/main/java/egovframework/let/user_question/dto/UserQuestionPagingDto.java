package egovframework.let.user_question.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserQuestionPagingDto {
	
	private List<UserQuestionDto> userQuestions;
	
	private Integer totalPageNo;
	
	private Integer totalRecordNo;
}
