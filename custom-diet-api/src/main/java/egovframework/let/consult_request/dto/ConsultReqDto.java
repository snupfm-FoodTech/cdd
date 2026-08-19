package egovframework.let.consult_request.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.dto.PagingType;
import egovframework.com.cmm.util.DateTimeUtil;
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
public class ConsultReqDto implements PagingType {

	Long id;
	
	CommonCodeDto foodTech;
	
	String companyName;
	
	String companyBizNo;
	
	CommonCodeDto companyAddress;
	
	String senderName;

	String senderPhoneNo;
	
	String senderEmail;
	
	List<CommonCodeDto> solutionTypes;
	
	List<CommonCodeDto> solutionTargets;
	
	String solutionTitle;

	String solutionDetail;
	
	@JsonFormat(pattern = DateTimeUtil.DATE_TIME_FORMAT)
	LocalDateTime creDt;
}