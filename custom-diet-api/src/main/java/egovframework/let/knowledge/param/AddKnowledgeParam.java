package egovframework.let.knowledge.param;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddKnowledgeParam {
	
	@NotBlank(message = "{knowledge.title.not-blank}")
	private String kwlgTit;
	
	@NotBlank(message = "{knowledge.func-type.not-blank}")
	private String kwlgFuncTpCd;
	
	@NotBlank(message = "{knowledge.diet-type.not-blank}")
	private String kwlgDietTpCd;
		
	@NotBlank(message = "{knowledge.link-url.not-blank}")
	private String kwlgLinkUrl;
	
	@NotBlank(message = "{knowledge.author.not-blank}")
	private String kwlgAut;
	
	@NotNull(message = "{knowledge.attachment-file.not-null}")
	private List<MultipartFile> files;
}
