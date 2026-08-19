package egovframework.let.solution.param;

import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateSolutionTypeParam {
	
	@Schema(hidden = true)
	Long id;

	@Size(min = 1, max = 100, message = "{solution-type.title.length.invalid}")
	String title;
	
	@Size(max = 255, message = "{solution-type.description.length.invalid}")
	String description;
	
	@Size(max = 100, message = "{solution-type.tag.length.invalid}")
	String tag;
	
	MultipartFile iconFile;
}
