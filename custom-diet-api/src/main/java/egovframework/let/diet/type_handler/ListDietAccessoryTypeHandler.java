package egovframework.let.diet.type_handler;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import egovframework.let.diet.dto.DietAccessoryDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ListDietAccessoryTypeHandler extends GenericTypeHandler<List<DietAccessoryDto>> {

	@Override
	public List<DietAccessoryDto> parseJson(String json) {
		try {
			if (json == null) {
				List<DietAccessoryDto> list = new ArrayList<>();
				list.add(new DietAccessoryDto());
				return list;
			}
			return objectMapper.readValue(json, new TypeReference<List<DietAccessoryDto>>() {
			});
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type");
		}
	}
}
