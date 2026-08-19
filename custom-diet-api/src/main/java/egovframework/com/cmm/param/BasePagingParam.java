package egovframework.com.cmm.param;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class BasePagingParam {

    @Schema(example = "1")
    @NotNull(message = "{page.not-null}")
    @Min(value = 1, message = "{page.positive}")
    Integer page; //page must not be null and > 0

    @Schema(example = "10")
    @NotNull(message = "{limit.not-null}")
    @Min(value = 1, message = "{limit.positive}")
    Integer limit; //limit must not be null and > 0
}