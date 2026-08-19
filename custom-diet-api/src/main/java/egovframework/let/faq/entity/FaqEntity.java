package egovframework.let.faq.entity;

import egovframework.com.cmm.entity.BaseEntity;
import egovframework.com.cmm.validation.annotation.AdditionalField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@EqualsAndHashCode(callSuper=true)
@ToString(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
public class FaqEntity extends BaseEntity {

    private Integer faqId;

    private String faqQueCtnt;

    private String faqAnsCtnt;

    @AdditionalField
    private Integer ttlNo;
    
    @AdditionalField
    private Integer no;
}
