package egovframework.let.diet.type_handler;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import egovframework.let.diet.dto.DietMaterialGeoDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ListDietMaterialGeoHandler extends GenericTypeHandler<List<DietMaterialGeoDto>> {

	@Override
	public List<DietMaterialGeoDto> parseJson(String json) {
		try {
			if (json == null) {
				return Collections.emptyList();
			}
			
			return objectMapper.readValue(json, new TypeReference<List<DietMaterialGeoDto>>() {
			});
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type");
		}
	}

}
