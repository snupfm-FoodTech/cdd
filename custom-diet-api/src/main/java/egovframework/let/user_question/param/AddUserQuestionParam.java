package egovframework.let.user_question.param;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddUserQuestionParam {
	
	private Integer queId;
	
	@NotBlank(message = "{user-question.que-tit.not-blank}")
	private String queTit;
	
	@NotBlank(message = "{user-question.que-ctnt.not-blank}")
	private String queCtnt;
	
	private List<MultipartFile> files;
	
	private List<String> deletedFilePaths;
}
