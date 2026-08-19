package egovframework.let.notice.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticePagingDto {
	
	private List<NoticeDto> notices;
	
	private Integer totalPageNo;
	
	private Integer totalRecordNo;
}
