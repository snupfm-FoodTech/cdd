package egovframework.let.faq.service;

import egovframework.let.faq.dto.FaqDto;
import egovframework.let.faq.dto.FaqPagingDto;
import egovframework.let.faq.param.AddFaqParam;
import egovframework.let.faq.param.FindAllFaqParam;
import egovframework.let.faq.param.UpdateFaqParam;

public interface EgovFaqService {

	FaqPagingDto findAllFaq(FindAllFaqParam params);

	FaqDto findFaqById(int faqId);

	FaqDto addFaq(AddFaqParam param);

	FaqDto updateFaqById(int id, UpdateFaqParam param);

	void deleteFaqById(int id);
}