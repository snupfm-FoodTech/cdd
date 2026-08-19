package egovframework.let.diet.type_handler;

import java.util.Collections;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import egovframework.let.diet.dto.DietStandardDto;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class DietStandardTypeHandler extends GenericTypeHandler<DietStandardDto> {

	@Override
	public DietStandardDto parseJson(String json) {
		try {
			DietStandardDto standard = objectMapper.readValue(json, new TypeReference<DietStandardDto>() {
			});
			if (standard != null) {
				if (standard.getNutrients() == null) {
					standard.setNutrients(Collections.emptyList());
				}
			}
			return standard;
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type");
		}
	}
}
