package egovframework.let.notice.entity;

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
public class NoticeEntity extends BaseEntity {
	
	private Integer ntcId;
	
	private String ntcTit;
	
	private String ntcCtnt;
	
	private String ntcAtchUrl;
	
	@AdditionalField
	private Integer ttlNo;
	
	@AdditionalField
	private Integer no;
}
