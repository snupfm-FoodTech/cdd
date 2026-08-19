package egovframework.let.diet.entity;

import egovframework.com.cmm.entity.BaseEntity;
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
public class DietStandardDetailEntity extends BaseEntity {

	private Integer dietId;
    
	private String nutrCd;
    
	private String nutrMandFlg;
	
	private Double nutrWgtFm;
    
	private Double nutrWgtTo;
	
	private String nutrFormula;
}