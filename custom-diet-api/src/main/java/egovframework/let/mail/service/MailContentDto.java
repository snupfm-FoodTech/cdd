package egovframework.let.mail.service;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MailContentDto {
	
	private String toEmail;
	
	private String title;
	
	private String templateName;
	
	private Map<String, Object> templateModel;
}