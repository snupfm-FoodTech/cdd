package egovframework.let.user_question.param;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserQuestionParam {
	
    private Integer offset;

    private Integer limit;

    private String orderByField;

    private Boolean isDesc = false;
    
    private String queTit;
    
    private Integer queUsrId;
}
