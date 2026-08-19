package egovframework.com.cmm.service;

import java.util.List;

import egovframework.com.cmm.dto.CommonCodeDto;

public interface EgovCommonService {
	
	public List<CommonCodeDto> findAllDataByIntgCd(String intgCd);
	public void verifyIntgCode(String intgCd, String code, String messageCode);
}