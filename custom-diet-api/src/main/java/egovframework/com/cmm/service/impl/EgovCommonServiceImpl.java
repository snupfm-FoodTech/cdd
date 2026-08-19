package egovframework.com.cmm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.service.EgovCommonService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovCommonServiceImpl extends EgovAbstractServiceImpl implements EgovCommonService {
	
	private final CommonDAO commonDAO;
	
	private final EgovMessageSource messageService;
	
	@Override
	public void verifyIntgCode(String intgCd, String code, String messageCode) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("intgCd",intgCd );
		resultMap.put("codeId",code );
		if (commonDAO.findCodeDetail(resultMap).isEmpty()) {
			throw new CustomNotFoundException(messageService.get(messageCode, code));
		}
		
	}

	@Override
	public List<CommonCodeDto> findAllDataByIntgCd(String intgCd) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("intgCd", intgCd );
		
		return commonDAO.findCodeDetail(resultMap);
	}
	
}