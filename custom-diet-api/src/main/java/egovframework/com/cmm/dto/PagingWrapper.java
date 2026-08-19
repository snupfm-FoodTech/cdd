package egovframework.com.cmm.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagingWrapper<T extends PagingType> {
    List<T> data;

    MetaData meta;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MetaData {
        long totalItems;
        long totalPages;
    }
}