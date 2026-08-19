package egovframework.com.cmm.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private Object content;
    private boolean hasErrors;
    private List<String> errors;
    private String timeStamp;
    private int statusCode;
}