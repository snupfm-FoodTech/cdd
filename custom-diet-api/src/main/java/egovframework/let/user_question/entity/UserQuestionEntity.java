package egovframework.let.user_question.entity;

import egovframework.com.cmm.entity.BaseEntity;
import egovframework.com.cmm.validation.annotation.AdditionalField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper=true)
@ToString(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserQuestionEntity extends BaseEntity {
	
	private Integer queId;
    
	private String queSttCd;
    
    private Integer queUsrId;
    
    private String queTit;
    
    private String queCtnt;
    
    private Integer ansUsrId;
    
    private String ansCtnt;
    
    private String queAtchUrl;
    
    @AdditionalField
    private Integer ttlNo;
    
    @AdditionalField
    private String queSttNm;
    
    @AdditionalField
    private String queUsrNm;
    
    @AdditionalField
    private String queUsrEml;
    
    @AdditionalField
    private String ansUsrNm;
    
    @AdditionalField
    private String ansUsrEml;
    
    @AdditionalField
    private Integer no;
}
