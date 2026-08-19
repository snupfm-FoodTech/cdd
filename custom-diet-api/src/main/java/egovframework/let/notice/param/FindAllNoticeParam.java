package egovframework.let.notice.param;

import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindAllNoticeParam {
	
	@NullOrPositiveNo(fieldName = "page")
    private Integer page;

    @NullOrPositiveNo(fieldName = "limit")
    private Integer limit;

    private String orderByField;

    private Boolean isDesc = false;
    
    private String ntcTit;
    
    private String ntcCtnt;
}
