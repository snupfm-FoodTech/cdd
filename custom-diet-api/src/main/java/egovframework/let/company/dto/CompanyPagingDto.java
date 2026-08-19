package egovframework.let.company.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyPagingDto {
	private List<CompanyDto> companies;
	
	private Integer totalPageNo;
	
	private Integer totalRecordNo;
}
