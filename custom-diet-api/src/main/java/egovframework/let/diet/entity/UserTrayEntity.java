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
public class UserTrayEntity extends BaseEntity {

	private Integer trayId;

	private Integer usrId;

	private String trayNm;

	private String repTrayCd;

	private String trayMandFlg;

	private Integer dietId;  // nullable - 어떤 Diet에서 생성되었는지 추적
}