package egovframework.com.config.mybatis;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ObjectTypeHandler extends GenericTypeHandler<Object> {

    @Override
    public Object parseJson(String json) {
        if (json == null) return null;
        try {
            // Deserialize JSON to Map for a generic object
            return objectMapper.readValue(json, Map.class);
        } catch (JsonProcessingException e) {
            log.error("Failed to parse JSON", e);
            return null;
        }
    }
}
