package egovframework.let.knowledge.param;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateKnowledgeParam {
	
	private Integer kwlgId;
	
	private String kwlgTit;
	
	private String kwlgFuncTpCd;
	
	private String kwlgDietTpCd;
		
	private String kwlgLinkUrl;
	
	private String kwlgAut;
	
	private List<MultipartFile> files;
	
	private List<String> deletedFilePaths;
}
