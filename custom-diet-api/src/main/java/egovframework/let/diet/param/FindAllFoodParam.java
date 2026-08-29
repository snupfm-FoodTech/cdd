package egovframework.let.diet.param;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindAllFoodParam {

	private Integer offset;

	private Integer limit;

	private String keyword;

	private String fdTpCd;

	private String matCd;

	private List<Integer> excludedAllergenIds;
}
