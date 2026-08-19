package egovframework.let.user_question.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserQuestionDto {
	
	private Integer no;
	
	private Integer queId;
	    
	private String queSttCd;
	
	private String queSttNm;//additional
    
    private Integer queUsrId;
    
    private String queUsrNm;//additional
    
    private String queUsrEml;//additional
    
    private String queTit;
    
    private String queCtnt;
    
    private Integer ansUsrId;
    
    private String ansUsrNm;//additional
    
    private String ansUsrEml;//additional
    
    private String ansCtnt;
    
    private List<String> queAtchUrls;
    
	private Integer creUsrId;
	
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creDt;
    
    private Integer updUsrId;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updDt;
}
