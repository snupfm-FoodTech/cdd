package egovframework.let.diet.type_handler;


import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import egovframework.let.diet.dto.DietMaterialDto;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class ListDietMaterialTypeHandler extends GenericTypeHandler<List<DietMaterialDto>> {

	@Override
	public List<DietMaterialDto> parseJson(String json) {
		try {
			if (json == null) {
				return Collections.emptyList();
			}
			List<DietMaterialDto> mats = objectMapper.readValue(json, new TypeReference<List<DietMaterialDto>>() {
			});
			if (mats != null && !mats.isEmpty()) {
				mats.stream().forEach(e -> {
					if (e.getGeos() == null) {
						e.setGeos(Collections.emptyList());
					}
				});
			} else {
				mats = Collections.emptyList();
			}
			
			return mats;
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type");
		}
	}

}
