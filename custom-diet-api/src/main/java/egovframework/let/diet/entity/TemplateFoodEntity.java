package egovframework.let.diet.entity;

import java.math.BigDecimal;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/** tmpl_fd row - 음식(레시피)을 구성하는 재료와 중량. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TemplateFoodEntity {

	String tmplFdCd;

	String tmplMatCd;

	BigDecimal tmplMatRcpWgt;

	BigDecimal tmplMatCalcWgt;
}
