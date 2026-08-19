package egovframework.let.company.param;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddCompanyParam {
	
	@NotNull(message = "{company.co-tp-id.not-null}")
	private Integer coTpId;
		
	@NotNull(message = "{company.co-nm.not-null}")
	private String coNm;
		
	@NotNull(message = "{company.co-eng-nm.not-null}")
	private String coEngNm;
	
	@NotNull(message = "{company.co-biz-no.not-null}")
	private String coBizNo;
	
	@NotNull(message = "{company.co-no.not-null}")
	private String coNo;
	
	@NotNull(message = "{company.co-rep-nm.not-null}")
	private String coRepNm;
	
	@NotNull(message = "{company.co-ttl-emp-no.not-null}")
	@PositiveOrZero(message = "{company.co-ttl-emp-no.positive-or-zero}")
	private Integer coTtlEmpNo;
	
	private String coEstFom; //nullable
	
	@NotNull(message = "{company.co-est-dt.not-null}")
	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "{dto.date.invalid}")
	private String coEstDt; //YYYY-MM-DD
	
	private String coFom; //nullable
	
	@NotNull(message = "{company.co-phn-no.not-null}")
	private String coPhnNo;
	
	@NotNull(message = "{company.co-sz-cd.not-null}")
	private String coSzCd;

	@NotNull(message = "{company.co-pals-no.not-null}")
	private String coPalsNo;
	
	@NotNull(message = "{company.co-addr.not-null}")
	private String coAddr;
	
	@NotNull(message = "{company.co-eml.not-null}")
	private String coEml;
	
	private String coHpgUrl; //nullable
	
	private String coIndus; //nullable
	
	private List<MultipartFile> files;
}
