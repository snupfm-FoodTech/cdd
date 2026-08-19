package egovframework.let.diet.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindMyMaterialsParam {

	private Integer offset;

	private Integer limit;

	private String keyword;

	private Integer creUsrId;

	private String matCd;
}
