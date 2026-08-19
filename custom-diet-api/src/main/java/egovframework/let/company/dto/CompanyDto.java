package egovframework.let.company.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
	
    private Integer no;
    
	private Integer coTpId;
	
	private String coTpNm; //additional
	
	private Integer coId;
	
	private String coNm;
		
	private String coEngNm;
	
	private String coBizNo;
	
	private String coNo;
	
	private String coRepNm;
	
	private Integer coTtlEmpNo;
	
	private String coEstFom;
	
	private String coEstDt; //YYYY-MM-DD
	
	private String coFom;
	
	private String coPhnNo;
	
	private String coSzCd;
	
	private String coSzNm; //additional

	private String coPalsNo;
	
	private String coAddr;
	
	private String coEml;
	
	private String coHpgUrl;
	
	private String coIndus;
	
	private List<String> coImgUrls;
	
	private Integer coViewQtt;
	
	private Integer creUsrId;
	
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    private LocalDateTime creDt;

    private Integer updUsrId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updDt;
}
