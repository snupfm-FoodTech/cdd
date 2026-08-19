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
public class UserTrayDetailEntity extends BaseEntity {

	private Integer trayId;
	
	private Integer fdSeq;
	
	private String fdMandFlg;
	
	private String fdSepFlg;
	
	private Integer fdCapaVol;
		
	private String unitCd;
	
	private String fdTpCd;
	
}
