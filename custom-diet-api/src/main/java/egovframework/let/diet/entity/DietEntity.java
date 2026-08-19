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
public class DietEntity extends BaseEntity {
	
	private Integer dietId;
	
	private Integer usrId;
	
	private String stdCd;
	
	private String stdNm;
	
	private String dietNm;
	
	private String dietDesc;
	
	private String dietFavFlg;
	
	private Integer trayId;
	
	private String trayNm;
	
	private String repTrayCd;
	
	private String trayMandFlg;
}
