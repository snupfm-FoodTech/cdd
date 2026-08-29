package egovframework.let.diet.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * mst_fd row. 감사(audit) 컬럼이 없는 테이블이므로 BaseEntity 를 상속하지 않는다.
 * ownUsrId 가 채워진 행은 해당 사용자가 만든 레시피이며 공용 조회에서 제외된다.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodEntity {

	String fdCd;

	String fdNm;

	String fdTpCd;

	String fdRcpDesc;

	Integer ownUsrId;
}
