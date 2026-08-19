package egovframework.let.notice.param;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateNoticeParam {
	
	private Integer ntcId;
	
	private String ntcTit;
	
	private String ntcCtnt;
	
	private List<MultipartFile> files;
	
	private List<String> deletedFilePaths;
}
