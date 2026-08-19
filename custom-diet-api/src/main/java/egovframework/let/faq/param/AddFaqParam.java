package egovframework.let.faq.param;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddFaqParam {

    @NotBlank(message = "{faq.que-ctnt.not-blank}")
    private String faqQueCtnt;

    @NotBlank(message = "{faq.ans-ctnt.not-blank}")
    private String faqAnsCtnt;

}
