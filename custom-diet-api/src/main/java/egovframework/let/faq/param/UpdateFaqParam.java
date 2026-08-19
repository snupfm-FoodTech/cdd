package egovframework.let.faq.param;


import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateFaqParam {
	
    @NotNull(message = "{company.co-tp-dtl-id.not-null}")
    private String faqQueCtnt;

    @NotNull(message = "{company.co-tp-dtl-id.not-null}")
    private String faqAnsCtnt;

}
