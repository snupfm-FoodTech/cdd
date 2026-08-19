package egovframework.com.config.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.config.mapper.ModelMapperConfig;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class GenericTypeHandler<T> extends BaseTypeHandler<T> {
	protected final ObjectMapper objectMapper = ModelMapperConfig.getObjectMapper();

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, T parameter, JdbcType jdbcType) throws SQLException {
		try {
			ps.setString(i, objectMapper.writeValueAsString(parameter));
		} catch (JsonProcessingException | SQLException e) {
			log.error(e.getMessage());
		}
	}

	@Override
	public T getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return parseJson(rs.getString(columnName));
	}

	@Override
	public T getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return parseJson(rs.getString(columnIndex));
	}

	@Override
	public T getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return parseJson(cs.getString(columnIndex));
	}

	public abstract T parseJson(String json);
}