package egovframework.let.notice.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeDto {
	
	private Integer no;
	
	private Integer ntcId;
	
	private String ntcTit;
	
	private String ntcCtnt;
	
	private List<String> ntcAtchUrls;
	
	private Integer creUsrId;
	
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    private LocalDateTime creDt;

    private Integer updUsrId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updDt;
}
