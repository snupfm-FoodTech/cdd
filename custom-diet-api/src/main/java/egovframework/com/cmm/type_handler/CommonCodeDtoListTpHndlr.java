package egovframework.com.cmm.type_handler;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonCodeDtoListTpHndlr extends GenericTypeHandler<List<CommonCodeDto>> {
	
	@Override
	public List<CommonCodeDto> parseJson(String json) {
		try {
			if (json == null) {
				return Collections.emptyList();
			}
			return objectMapper.readValue(json, new TypeReference<>() {
			});
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type at: " + this.getClass().getName());
		}
	}

}
