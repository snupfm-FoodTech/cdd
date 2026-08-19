package egovframework.let.faq.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FaqPagingDto {
    private List<FaqDto> faqs;

    private Integer totalPageNo;

    private Integer totalRecordNo;
}
