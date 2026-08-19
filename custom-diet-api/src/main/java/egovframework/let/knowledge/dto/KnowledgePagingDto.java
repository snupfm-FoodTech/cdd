package egovframework.let.knowledge.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KnowledgePagingDto {
	
	private List<KnowledgeDto> knowledges;
	
	private Integer totalPageNo;
	
	private Integer totalRecordNo;
}
