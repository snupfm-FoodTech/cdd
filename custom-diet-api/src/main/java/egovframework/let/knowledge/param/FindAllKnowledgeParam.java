package egovframework.let.knowledge.param;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import egovframework.com.cmm.util.DateTimeUtil;
import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAllKnowledgeParam {
	
	@NullOrPositiveNo(fieldName = "page")
    private Integer page;

    @NullOrPositiveNo(fieldName = "limit")
    private Integer limit;

    private String orderByField;

    private Boolean isDesc = false;
    
    private String kwlgFuncTpCd;
    
    private String kwlgDietTpCd;
    
    private String kwlgTit;
    
    @DateTimeFormat(pattern = DateTimeUtil.DATE_FORMAT)
    private Date creDtFm;
    
    @DateTimeFormat(pattern = DateTimeUtil.DATE_FORMAT)
    private Date creDtTo;
}
