package egovframework.let.consult_request.service.impl;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.validation.ValidationException;

import org.springframework.stereotype.Service;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.dto.PagingWrapper;
import egovframework.com.cmm.param.BasePagingParam;
import egovframework.let.consult_request.dto.ConsultReqDto;
import egovframework.let.consult_request.service.EgovConsultReqService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovConsultReqServiceImpl implements EgovConsultReqService {
	private final ConsultReqDAO consultReqDAO;
	private final EgovMessageSource messageService;
	
	@Override
	public ConsultReqDto findConsultReqById(long id) {
		return consultReqDAO.findConsulReqById(id)
				.orElseThrow(() -> new ValidationException(messageService.get("corporate-consult.not-found")));
	}
	
	@Override
	public PagingWrapper<ConsultReqDto> findAllConsultReq(BasePagingParam param) {
		// create sql params;
		Map<String, Object> sqlParam = new HashMap<>();
		sqlParam.put("page", param.getPage());
		sqlParam.put("limit", param.getLimit());
		
		long totalItems = consultReqDAO.countAllConsultReq(sqlParam).orElse(0L);
		
		if (totalItems == 0) { //if length is 0 => return immediately without querying more data
            return PagingWrapper.<ConsultReqDto>builder()
                    .data(Collections.emptyList())
                    .meta(PagingWrapper.MetaData.builder()
                            .totalItems(0)
                            .totalPages(0)
                            .build())
                    .build();
        }
		
		 //calculate total pages, then round up
        long totalPages = (long) Math.ceil((double) totalItems / param.getLimit());
		
        return PagingWrapper.<ConsultReqDto>builder()
                .data(consultReqDAO.findAllConsultReq(sqlParam))
                .meta(PagingWrapper.MetaData.builder()
                        .totalItems(totalItems)
                        .totalPages(totalPages)
                        .build())
                .build();
	}
}
