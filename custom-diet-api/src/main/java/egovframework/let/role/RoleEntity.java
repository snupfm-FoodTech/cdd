package egovframework.let.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleEntity {
	
	private Integer roleId;
	
	private String roleCd;
	
	private String roleDesc;
}
