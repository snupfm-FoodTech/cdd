package egovframework.let.solution.param;

import javax.validation.constraints.NotNull;

import egovframework.com.cmm.param.BasePagingParam;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FindAllSolutionContentParam extends BasePagingParam {
	
	@NotNull(message = "{solution-type.id.not-null}")
	Long typeId;

}