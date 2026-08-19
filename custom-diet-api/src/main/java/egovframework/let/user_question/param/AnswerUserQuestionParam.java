package egovframework.let.user_question.param;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerUserQuestionParam {
	
	@NotNull(message = "{user-question.que-id.not-null}")
	private Integer queId;
	
	@NotBlank(message = "{user-question.ans-ctnt.not-blank}")
	private String ansCtnt;

}
