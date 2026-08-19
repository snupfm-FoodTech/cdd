package egovframework.let.company.entity;

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
public class CompanyEntity extends BaseEntity {

	private Integer coTpId;
		
	private Integer coId;
	
	private String coNm;
	
	private String coEngNm;
	
	private String coBizNo;
	
	private String coNo;
	
	private String coRepNm;
		
	private Integer coTtlEmpNo;
	
	private String coEstFom;
	
	private String coEstDt;
	
	private String coFom;
	
	private String coPhnNo;
	
	private String coSzCd;
	
	private String coPalsNo;
	
	private String coAddr;
	
	private String coEml;
	
	private String coHpgUrl;
	
	private String coIndus;
	
	private String coImgUrl;
	
	private Integer coViewQtt;
	
    @AdditionalField
    private Integer ttlNo;
    
    @AdditionalField
    private String coSzNm;
    
    @AdditionalField
    private String coTpNm;
    
    @AdditionalField
    private Integer no;
}
