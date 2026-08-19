package egovframework.let.user.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
	
	private Integer no;
	
	private Integer usrId;
	
	private String usrEml;
	
	private String usrNm;
	
	private String usrPhnNo;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime usrLstLoginDt;
	
	private String usrAcctSttCd;
	
	private String usrRoles;
	
	private Integer creUsrId;
	
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creDt;
    
    private Integer updUsrId;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updDt;
}
