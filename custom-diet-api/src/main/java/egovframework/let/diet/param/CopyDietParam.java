package egovframework.let.diet.param;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** 식단 복사 요청. 이름을 비워 보내면 서버가 "원본명 (사본)" 을 붙인다. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CopyDietParam {

	private String name;
}
