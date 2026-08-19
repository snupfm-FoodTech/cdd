package egovframework.com.cmm.type_handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.config.mybatis.GenericTypeHandler;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonCodeDtoTpHndlr extends GenericTypeHandler<CommonCodeDto> {
	
	@Override
	public CommonCodeDto parseJson(String json) {
		try {
			if (json == null) {
				return null;
			}
			return objectMapper.readValue(json, new TypeReference<>() {
			});
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
			throw new CustomException("Cannot mapping Json type at: " + this.getClass().getName());
		}
	}

}
