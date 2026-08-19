package egovframework.let.user_question.param;

import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindAllUsrQueByQueUsrIdParam {
	
	@NullOrPositiveNo(fieldName = "page")
    private Integer page;

    @NullOrPositiveNo(fieldName = "limit")
    private Integer limit;

    private String orderByField;

    private Boolean isDesc = false;
}
