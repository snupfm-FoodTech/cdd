package egovframework.let.knowledge.entity;

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
public class KnowledgeEntity extends BaseEntity {

	private Integer kwlgId;	
	
	private String kwlgTit;
	
	private String kwlgFuncTpCd;
	
	private String kwlgDietTpCd;
	
	private Integer kwlgViewQtt;
	
	private String kwlgLinkUrl;
	
	private String kwlgAtchUrl;
	
	private String kwlgAut;
	
	@AdditionalField
	private Integer ttlNo;
	
	@AdditionalField 
	private String kwlgFuncTpNm;
	
	@AdditionalField 
	private String kwlgDietTpNm;
	
	@AdditionalField 
	private Integer no;
}
