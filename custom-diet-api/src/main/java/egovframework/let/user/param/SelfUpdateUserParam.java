package egovframework.let.user.param;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelfUpdateUserParam {
	
	private String name;
	
	@Pattern(regexp = "^$|\\d+", message = "{auth.user-phone.empty-or-number}")
	private String phoneNo;
	
	private String newPassword;
	
	private String currentPassword;
}
