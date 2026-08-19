package egovframework.let.company.param;

import egovframework.com.cmm.validation.annotation.CustomYear;
import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAllCompanyParam {
	
	@NullOrPositiveNo(fieldName = "page")
    private Integer page;

    @NullOrPositiveNo(fieldName = "limit")
    private Integer limit;

    private String orderByField;

    private Boolean isDesc = false;

    private String coSzCd;
    
    @CustomYear(fieldName = "coEstYrFm")
    private String coEstYrFm;
    
    @CustomYear(fieldName = "coEstYrTo")
    private String coEstYrTo;
    
    private String coNm;
    
    private String coRepNm;
    
    private Integer coTpId;
    
    private String coTpNm;
}
