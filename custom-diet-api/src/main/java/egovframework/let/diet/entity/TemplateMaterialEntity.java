package egovframework.let.diet.entity;

import java.math.BigDecimal;

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
public class TemplateMaterialEntity extends BaseEntity {
	
	private String tmplMatCd;
	
	private String tmplNutrCd;
	
	private BigDecimal tmplMatWgt;
	
	private String tmplMatUnitCd;
	
	private BigDecimal tmplNutrAmt;
}
