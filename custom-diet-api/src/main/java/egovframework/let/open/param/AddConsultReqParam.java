package egovframework.let.open.param;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddConsultReqParam {

	@NotBlank(message = "{corporate-consult.food-tech-id.not-empty}")
	String foodTechId;
	
	@NotBlank(message = "{corporate-consult.company-name.not-empty}")
	@Size(max = 100, message = "{corporate-consult.company-name.length.invalid}")
	String companyName;
	
	@NotBlank(message = "{corporate-consult.company-biz-no.not-empty}")
	@Size(max = 50, message = "{corporate-consult.company-biz-no.length.invalid}")
	String companyBizNo;
	
	@NotBlank(message = "{corporate-consult.company-address-id.not-empty}")
	String companyAddressId;
	
	@NotBlank(message = "{corporate-consult.sender-name.not-empty}")
	@Size(max = 100, message = "{corporate-consult.sender-name.length.invalid}")
	String senderName;
	
	@NotBlank(message = "{corporate-consult.sender-phone-no.not-empty}")
	@Size(max = 50, message = "{corporate-consult.sender-phone-no.length.invalid}")
	String senderPhoneNo;
	
	@NotBlank(message = "{corporate-consult.sender-email.not-empty}")
	String senderEmail;
	
	@NotEmpty(message = "{corporate-consult.solution-type-ids.not-empty}")
	List<String> solutionTypeIds;
	
	@NotEmpty(message = "{corporate-consult.solution-target-ids.not-empty}")
	List<String> solutionTargetIds;
	
	@NotBlank(message = "{corporate-consult.solution-title.not-empty}")
	@Size(max = 50, message = "{corporate-consult.solution-title.length.invalid}")
	String solutionTitle;

	@NotBlank(message = "{corporate-consult.solution-detail.not-empty}")
	@Size(max = 5000, message = "{corporate-consult.solution-detail.length.invalid}")
	String solutionDetail;
}