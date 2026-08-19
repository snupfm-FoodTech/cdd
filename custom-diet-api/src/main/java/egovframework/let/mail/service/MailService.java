package egovframework.let.mail.service;

public interface MailService {
	void sendEmailVerificationCode(MailContentDto mailContent);
}
