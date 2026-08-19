package egovframework.let.notice.param;

import java.util.List;

import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddNoticeParam {
	
	@NotBlank(message = "{notice.title.not-blank}")
	private String ntcTit;
	
	@NotBlank(message = "{notice.content.not-blank}")
	private String ntcCtnt;
	
	private List<MultipartFile> files;
}
