package egovframework.let.consult_request.entity;

import java.util.List;

import egovframework.com.cmm.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;



@Data
@EqualsAndHashCode(callSuper=true)
@ToString(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConsultReqEntity extends BaseEntity {
	
	Long id;
	
	String foodTechId;
	
	String companyName;
	
	String companyBizNo;
	
	String companyAddressId;
	
	String senderName;

	String senderPhoneNo;
	
	String senderEmail;
	
	List<String> solutionTypeIds;
	
	List<String> solutionTargetIds;
	
	String solutionTitle;

	String solutionDetail;
}