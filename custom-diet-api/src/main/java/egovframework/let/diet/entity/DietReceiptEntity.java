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
public class DietReceiptEntity extends BaseEntity {
	
	private Integer rctId;
	
	private Integer dietId;
	
	private BigDecimal unitPrc;
	
	private Integer servQty;
	
	private Integer adjPct;
	
	private BigDecimal fnlPrc;
}