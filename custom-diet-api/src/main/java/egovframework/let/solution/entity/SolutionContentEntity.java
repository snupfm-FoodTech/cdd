package egovframework.let.solution.entity;

import egovframework.com.cmm.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(of = "id", callSuper = true)
@ToString(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class SolutionContentEntity extends BaseEntity {
	
	Long id;
	
	String title;
	
	String subTitle;
	
	Object description;
	
	String tag;
	
	String iconUrl;
	
	Integer typeId;
}