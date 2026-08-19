package egovframework.let.faq.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.validation.ValidationException;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.faq.dto.FaqDto;
import egovframework.let.faq.dto.FaqPagingDto;
import egovframework.let.faq.entity.FaqEntity;
import egovframework.let.faq.param.AddFaqParam;
import egovframework.let.faq.param.FindAllFaqParam;
import egovframework.let.faq.param.UpdateFaqParam;
import egovframework.let.faq.service.EgovFaqService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovFaqServiceImpl extends EgovAbstractServiceImpl implements EgovFaqService {

	private final ModelMapper modelMapper;
	
	private final EgovMessageSource messageService;
			
	private final FaqDAO faqDAO;

	@Override
	public FaqDto findFaqById(int faqId) {
		return modelMapper.map(faqDAO.findFaqById(faqId).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("faq.id.not-found", String.valueOf(faqId)))),
				FaqDto.class);
	}

	@Transactional
	@Override
	public FaqDto addFaq(AddFaqParam param) {
		FaqEntity newFaq = modelMapper.map(param, FaqEntity.class);
		if (faqDAO.addFaq(newFaq) < 1) {
			throw new ValidationException(messageService.get("faq.insert.failed"));
		}
		return findFaqById(newFaq.getFaqId());
	}

	@Transactional
	@Override
	public FaqDto updateFaqById(int id, UpdateFaqParam param) {
		faqDAO.findFaqById(id).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("faq.id.not-found", String.valueOf(id))));

		FaqEntity updateFaq = modelMapper.map(param, FaqEntity.class);
		updateFaq.setFaqId(id);
		if (faqDAO.updateFaqById(updateFaq) < 1) {
			throw new CustomException(messageService.get("faq.update.failed"));
		}

		return findFaqById(id);
	}

	@Transactional
	@Override
	public void deleteFaqById(int id) {
		faqDAO.findFaqById(id).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("faq.id.not-found", String.valueOf(id))));
		if (faqDAO.deleteFaqById(id) < 1) {
			throw new CustomException(messageService.get("faq.delete.failed"));
		}
	}

	@Override
	public FaqPagingDto findAllFaq(FindAllFaqParam params) {
		Integer page = params.getPage();
		Integer limit = params.getLimit();

		Integer[] arr = AppUtil.convertPageAndLimit(page, limit);
		HashMap<String, Object> searchFaqParams = new HashMap<String, Object>();
		searchFaqParams.put("offset", arr[0]);
		searchFaqParams.put("limit", arr[1]);
		searchFaqParams.put("faqQueCtnt", params.getFaqQueCtnt());
		searchFaqParams.put("faqAnsCtnt", params.getFaqAnsCtnt());

		List<FaqEntity> faqs = faqDAO.findAllFaq(searchFaqParams);
		int totalPageNo = 1;
		if (arr[1] == null) {
			totalPageNo = 1;
		} else if (!faqs.isEmpty() && faqs.get(0).getTtlNo() > arr[1]) {
			totalPageNo = (int) Math.ceil((double) faqs.get(0).getTtlNo() / arr[1]);
		}

		int totalRecordNo = 0;
		if (!faqs.isEmpty()) {
			totalRecordNo = faqs.get(0).getTtlNo();
		}

		return FaqPagingDto.builder()
				.faqs(faqs.stream().map(company -> modelMapper.map(company, FaqDto.class)).toList())
				.totalPageNo(totalPageNo).totalRecordNo(totalRecordNo).build();
	}
}