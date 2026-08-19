package egovframework.let.open.service;

import javax.transaction.Transactional;
import javax.validation.ValidationException;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.service.EgovCommonService;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.consult_request.dto.ConsultReqDto;
import egovframework.let.consult_request.entity.ConsultReqEntity;
import egovframework.let.consult_request.service.impl.ConsultReqDAO;
import egovframework.let.open.param.AddConsultReqParam;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovOpenServiceImpl implements EgovOpenService {
	private final EgovCommonService commonService;
	private final ModelMapper modelMapper;
	private final ConsultReqDAO consultReqDAO;
	
	@Transactional
	@Override
	public ConsultReqDto addConsultRequest(AddConsultReqParam param) {
		// validate food tech
		commonService.verifyIntgCode(AppUtil.CODE_FOOD_TECH, param.getFoodTechId(), "corporate-consult.food-tech.not-found");
		
		// validate company address
		commonService.verifyIntgCode(AppUtil.CODE_COMPANY_ADDRESS, param.getCompanyAddressId(), "corporate-consult.company-address.not-found");
		
		// validate solution types
		param.getSolutionTypeIds().forEach(type -> {
			commonService.verifyIntgCode(AppUtil.CODE_SOLUTION_TYPE, type, "corporate-consult.solution-type.not-found");
		});
		
		// validate solution targets
		param.getSolutionTargetIds().forEach(target -> {
			commonService.verifyIntgCode(AppUtil.CODE_SOLUTION_TARGET, target, "corporate-consult.solution-target.not-found");
		});
		
		// mapping and insert
		ConsultReqEntity newReq = modelMapper.map(param, ConsultReqEntity.class);
				if (consultReqDAO.addConsultReq(newReq) <= 0) {
			throw new CustomException("corporate-consult.insert.failed");
		}
		
		return consultReqDAO.findConsulReqById(newReq.getId())
				.orElseThrow(() -> new ValidationException("corporate-consult.not-found"));
	}
}