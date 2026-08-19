package egovframework.let.solution.param;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddSolutionContentParam {
	
	@NotNull(message = "{solution-type.id.not-null}")
	Long typeId;

	@NotBlank(message = "{solution-content.title.not-blank}")
	@Size(max = 100, message = "{solution-content.title.length.invalid}")
	String title;
	
	@NotBlank(message = "{solution-content.sub-title.not-blank}")
	@Size(max = 100, message = "{solution-content.sub-title.length.invalid}")
	String subTitle;
	
	@Size(max = 100, message = "{solution-content.tag.length.invalid}")
	String tag;

	MultipartFile iconFile;
}