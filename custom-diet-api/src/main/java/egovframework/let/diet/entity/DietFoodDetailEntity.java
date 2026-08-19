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
public class DietFoodDetailEntity extends BaseEntity {

	private Integer dietId;
	
	private Integer traySeq;
	
	private Integer fdSeq;
	
	private String matCd;
	
	private Double matRcpWgt;
	
	private Double matCalcWgt;
	
	private Integer matPrc;
	
	private String rctInclFlg;
}