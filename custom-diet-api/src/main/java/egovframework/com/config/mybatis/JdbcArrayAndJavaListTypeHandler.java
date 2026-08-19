package egovframework.com.config.mybatis;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.springframework.stereotype.Component;

import java.sql.Array;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/***
 * This type handler converts TEXT[], INTEGER[], BIGINT[] to
 * List<String>, List<Integer>, List<Long> respectively
 */
@Component
@MappedJdbcTypes(JdbcType.ARRAY)
@MappedTypes({List.class}) // Handles both List<String> and List<Integer>
public class JdbcArrayAndJavaListTypeHandler extends BaseTypeHandler<List<?>> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<?> parameter, JdbcType jdbcType) throws SQLException {
        // Convert List<?> to a PostgreSQL array
        if (parameter.isEmpty()) {
            ps.setArray(i, null);
        } else if (parameter.get(0) instanceof String) {
            Array array = ps.getConnection().createArrayOf("text", parameter.toArray());
            ps.setArray(i, array);
        } else if (parameter.get(0) instanceof Integer) {
            Array array = ps.getConnection().createArrayOf("integer", parameter.toArray());
            ps.setArray(i, array);
        } else if (parameter.get(0) instanceof Long) {
            Array array = ps.getConnection().createArrayOf("bigint", parameter.toArray());
            ps.setArray(i, array);
        } else if (parameter.get(0) instanceof UUID) {
            String[] uuidArray = parameter.stream()
                    .map(Object::toString)
                    .toArray(String[]::new);
            Array array = ps.getConnection().createArrayOf("uuid", uuidArray);
            ps.setArray(i, array);
        } else {
            throw new SQLException("Unsupported List type for JDBC Array");
        }
    }

    @Override
    public List<?> getNullableResult(ResultSet rs, String columnName) throws SQLException {
        Array array = rs.getArray(columnName);
        return arrayToList(array);
    }

    @Override
    public List<?> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        Array array = rs.getArray(columnIndex);
        return arrayToList(array);
    }

    @Override
    public List<?> getNullableResult(java.sql.CallableStatement cs, int columnIndex) throws SQLException {
        Array array = cs.getArray(columnIndex);
        return arrayToList(array);
    }

    private List<?> arrayToList(Array array) throws SQLException {
        if (array == null) {
            return Collections.emptyList();
        }

        // Determine the type of array
        Object[] objectArray = (Object[]) array.getArray();
        if (objectArray.length == 0) {
            return Collections.emptyList();
        }

        // Handle different types (String and Integer in this case)
        if (objectArray[0] instanceof String) {
            // Check if it's a UUID stored as a String
            try {
                return Arrays.stream((String[]) objectArray)
                        .map(UUID::fromString)
                        .toList();
            } catch (IllegalArgumentException e) {
                // If conversion fails, treat it as a List<String>
                return Arrays.asList((String[]) objectArray);
            }
        } else if (objectArray[0] instanceof Integer) {
            return Arrays.asList((Integer[]) objectArray);
        } else if (objectArray[0] instanceof Long) {
            return Arrays.asList((Long[]) objectArray);
        } else if (objectArray[0] instanceof Short) { //smallint
            return Arrays.stream((Short[]) objectArray)
                    .map(Integer::valueOf) // Convert Short to Integer
                    .toList();
        } else {
            throw new SQLException("Unsupported array type from JDBC");
        }
    }
}