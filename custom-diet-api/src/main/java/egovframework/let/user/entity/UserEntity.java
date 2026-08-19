package egovframework.let.user.entity;

import java.time.LocalDateTime;

import egovframework.com.cmm.entity.BaseEntity;
import egovframework.com.cmm.validation.annotation.AdditionalField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper=true)
@ToString(callSuper=true)
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity {
	
	private Integer usrId;
	
	private String usrEml;
	
	private String usrPwd;
	
    private String usrNm;
    
    private String usrPhnNo; 
    
    private LocalDateTime usrLstLoginDt;
    
    private String usrAcctSttCd;
    
    @AdditionalField
    private String usrRoles;
    
    @AdditionalField
    private Integer ttlNo;
    
    @AdditionalField
    private Integer no;
}
