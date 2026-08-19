package egovframework.let.faq.param;

import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAllFaqParam {
	
    @NullOrPositiveNo(fieldName = "page")
    private Integer page;

    @NullOrPositiveNo(fieldName = "limit")
    private Integer limit;

    private String faqQueCtnt;

    private String faqAnsCtnt;

}
