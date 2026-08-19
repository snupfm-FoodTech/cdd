package egovframework.let.company.param;

import java.util.List;

import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCompanyParam {
	
	private Integer coId;
	
	private Integer coTpId;
		
	private String coNm;
		
	private String coEngNm;
	
	private String coBizNo;
	
	private String coNo;
	
	private String coRepNm;
	
	private Integer coTtlEmpNo;
	
	private String coEstFom;
	
	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "{dto.date.invalid}")
	private String coEstDt; //YYYY-MM-DD
	
	private String coFom;
	
	private String coPhnNo;
	
	private String coSzCd;

	private String coPalsNo;
	
	private String coAddr;
	
	private String coEml;
	
	private String coHpgUrl;
	
	private String coIndus; 
	
	@Nullable
	private List<MultipartFile> files;
	
	private List<String> deletedFilePaths;
}
