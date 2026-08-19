package egovframework.let.mail.service.impl;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import egovframework.com.cmm.exception.CustomException;
import egovframework.let.mail.service.MailContentDto;
import egovframework.let.mail.service.MailService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
	private final JavaMailSender mailSender;
	private final SpringTemplateEngine templateEngine;

	@Async
	@Override
	public void sendEmailVerificationCode(MailContentDto dto) {
		try {
			Context context = new Context();
			context.setVariables(dto.getTemplateModel());
			String htmlBody = templateEngine.process(dto.getTemplateName(), context);

			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setTo(dto.getToEmail());
			helper.setSubject(dto.getTitle());
			helper.setText(htmlBody, true);
			mailSender.send(message);
		} catch (Exception e) {
			throw new CustomException(e.getMessage());
		}
	}
}
