package egovframework.let.knowledge.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KnowledgeDto {
	
	private Integer no;
	
	private Integer kwlgId;	
	
	private String kwlgTit;
	
	private String kwlgFuncTpCd;
	
	private String kwlgFuncTpNm;
	
	private String kwlgDietTpCd;
	
	private String kwlgDietTpNm;
	
	private Integer kwlgViewQtt;
	
	private String kwlgLinkUrl;
	
	private List<String> kwlgAtchUrls;
	
	private String kwlgAut;
	
	private Integer creUsrId;
	
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    private LocalDateTime creDt;

    private Integer updUsrId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updDt;
}
