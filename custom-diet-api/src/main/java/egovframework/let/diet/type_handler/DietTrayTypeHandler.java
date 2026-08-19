package egovframework.let.diet.type_handler;

import java.util.Collections;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import egovframework.let.diet.dto.DietTrayDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DietTrayTypeHandler extends GenericTypeHandler<DietTrayDto> {
	
	@Override
	public DietTrayDto parseJson(String json) {
		try {
			DietTrayDto tray = objectMapper.readValue(json, new TypeReference<DietTrayDto>() {
			});
			if (tray != null ) {
				if (tray.getFoods() != null) {
					tray.getFoods().forEach(food -> {
						if (food.getMaterials() == null) {
							food.setMaterials(Collections.emptyList());
						} else {
							food.getMaterials().stream().forEach(mat -> {
								if (mat.getGeos() == null) {
									mat.setGeos(Collections.emptyList());
								}
							});
						}
					});
				} else {
					tray.setFoods(Collections.emptyList());
				}
			}
			
			return tray;
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type");
		}
	}

}
