package egovframework.let.consult_request.service;

import egovframework.com.cmm.dto.PagingWrapper;
import egovframework.com.cmm.param.BasePagingParam;
import egovframework.let.consult_request.dto.ConsultReqDto;

public interface EgovConsultReqService {
	ConsultReqDto findConsultReqById(long id);
	PagingWrapper<ConsultReqDto> findAllConsultReq(BasePagingParam param);
}