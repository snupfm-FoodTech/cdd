package egovframework.let.diet.param;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExportDietsExcelParam {

	@NotEmpty(message = "다운로드할 식단을 선택해주세요.")
	private List<Integer> dietIds;
}