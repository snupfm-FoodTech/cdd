package egovframework.com.cmm.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseEntity {
	
    private Integer creUsrId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    private LocalDateTime creDt;

    private Integer updUsrId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    private LocalDateTime updDt;
}