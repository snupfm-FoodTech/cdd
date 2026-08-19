package egovframework.let.open.service;

import egovframework.let.consult_request.dto.ConsultReqDto;
import egovframework.let.open.param.AddConsultReqParam;

public interface EgovOpenService {
	ConsultReqDto addConsultRequest(AddConsultReqParam param);
}
