package egovframework.let.diet.entity;

import egovframework.com.cmm.entity.BaseEntity;
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
public class DietTrayDetailEntity extends BaseEntity {
	
	private Integer dietId; 
    	
	private Integer fdSeq;
	
	private String fdMandFlg;
	
	private String fdSepFlg;
	
	private Integer fdCapaVol;
		
	private String unitCd;

	private String fdTpCd;

	private String fdCd;
	
	private String fdNm;
			
	private String fdRcpDesc;
}