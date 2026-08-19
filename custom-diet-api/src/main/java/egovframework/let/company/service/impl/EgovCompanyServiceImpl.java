package egovframework.let.company.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.ValidationException;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.service.EgovCommonService;
import egovframework.com.cmm.service.impl.CommonDAO;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.company.dto.CompanyDto;
import egovframework.let.company.dto.CompanyPagingDto;
import egovframework.let.company.dto.CompanyTypeDto;
import egovframework.let.company.entity.CompanyEntity;
import egovframework.let.company.param.AddCompanyParam;
import egovframework.let.company.param.FindAllCompanyParam;
import egovframework.let.company.param.UpdateCompanyParam;
import egovframework.let.company.service.EgovCompanyService;
import egovframework.let.file.service.FileService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovCompanyServiceImpl extends EgovAbstractServiceImpl implements EgovCompanyService {

	private final ModelMapper modelMapper;
	
	private final EgovMessageSource messageService;
	
	private final FileService fileService;
		
	private final EgovCommonService commonService;
	
	private final CommonDAO commonDAO;

	private final CompanyDAO companyDAO;

	@Override
	public List<CompanyTypeDto> findAllCompanyType() {
		return companyDAO.findAllCompanyType().stream()
				.map(company -> modelMapper.map(company, CompanyTypeDto.class)).toList();
	}

	@Override
	public CompanyPagingDto findAllCompany(FindAllCompanyParam params) {
		String orderByField = params.getOrderByField();
		Integer page = params.getPage();
		Integer limit = params.getLimit();
		Boolean isDesc = params.getIsDesc();

		// validate
		if (orderByField != null) {
			if (AppUtil.doesFieldExist(orderByField, new CompanyEntity())) { // check whether the field exists
				orderByField = AppUtil.convertEntityFieldToColumn(orderByField);
			} else {
				throw new ValidationException(
				messageService.get("field.not-exist-in-entity", orderByField, AppUtil.ENTITY_COMPANY));
			}
		}
		Integer[] arr = AppUtil.convertPageAndLimit(page, limit);
		HashMap<String, Object> companySearchParams = new HashMap<String, Object>();
		companySearchParams.put("offset", arr[0]);
		companySearchParams.put("limit", arr[1]);
		companySearchParams.put("orderByField", orderByField);
		companySearchParams.put("isDesc", isDesc);
		companySearchParams.put("coSzCd", params.getCoSzCd());
		companySearchParams.put("coEstYrFm", params.getCoEstYrFm());
		companySearchParams.put("coEstYrTo", params.getCoEstYrTo());
		companySearchParams.put("coNm", params.getCoNm());
		companySearchParams.put("coRepNm", params.getCoRepNm());
		companySearchParams.put("coTpId", params.getCoTpId());
		companySearchParams.put("coTpNm", params.getCoTpNm());
		
		List<CompanyEntity> companies = companyDAO.findAllCompany(companySearchParams);
		int totalPageNo = 1;
		if (arr[1] == null) {
			totalPageNo = 1;
		} else if (!companies.isEmpty() && companies.get(0).getTtlNo() > arr[1]) {
			totalPageNo = (int) Math.ceil((double) companies.get(0).getTtlNo() / arr[1]);
		}

		int totalRecordNo = 0;
		if (!companies.isEmpty()) {
			totalRecordNo = companies.get(0).getTtlNo();
		}

		return CompanyPagingDto.builder().companies(companies.stream().map(company -> {
			CompanyDto dto = modelMapper.map(company, CompanyDto.class);
			dto.setCoImgUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_COMPANY, company.getCoId().toString()));
			return dto;
		}).toList()).totalPageNo(totalPageNo).totalRecordNo(totalRecordNo).build();
	}

	@Override
	public CompanyDto findCompanyById(int id) {
		CompanyEntity company = companyDAO.findCompanyById(id).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("company.id.not-found", String.valueOf(id))));
		CompanyDto dto = modelMapper.map(company, CompanyDto.class);
		dto.setCoImgUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_COMPANY, String.valueOf(id)));
		return dto;
	}

	@Override
	public List<CommonCodeDto> findAllCompanySize() {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("intgCd",AppUtil.CODE_COMPANY_SIZE );
		resultMap.put("codeId",null );
		return commonDAO.findCodeDetail(resultMap);
	}

	@Transactional
	@Override
	public CompanyDto addCompany(AddCompanyParam param) {
		// validate company type
		companyDAO.findCompanyTypeById(param.getCoTpId()).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("company.co-tp-id.not-found", param.getCoTpId())));
		// validate size code
		commonService.verifyIntgCode(AppUtil.CODE_COMPANY_SIZE, param.getCoSzCd(), "company.size.not-found");

		CompanyEntity newCompany = modelMapper.map(param, CompanyEntity.class);
		// save company
		newCompany.setCoImgUrl("/" + AppUtil.ENTITY_COMPANY + "/"); // id will be added in SQL
		if (companyDAO.addCompany(newCompany) < 1) {
			throw new ValidationException(messageService.get("company.insert.failed"));
		}

		try {
			// save file with id
			if (param.getFiles() != null && !param.getFiles().isEmpty()) {
				fileService.addFilesToEntity(AppUtil.ENTITY_COMPANY, String.valueOf(newCompany.getCoId()),
						param.getFiles());
			}
		} catch (Exception e) {
			fileService.deleteEntityFiles(AppUtil.ENTITY_COMPANY, String.valueOf(newCompany.getCoId()));
			throw new CustomException(e.getMessage());
		}
		return findCompanyById(newCompany.getCoId());
	}

	@Transactional
	@Override
	public CompanyDto updateCompany(int coId, UpdateCompanyParam param) {
		// check ID
		Optional<CompanyEntity> optCompany = companyDAO.findCompanyById(coId);
		if (optCompany.isEmpty()) {
			throw new CustomNotFoundException(messageService.get("company.id.not-found", String.valueOf(coId)));
		}
		
		// check company size
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("intgCd",AppUtil.CODE_COMPANY_SIZE );
		resultMap.put("codeId",param.getCoSzCd() );
		if (param.getCoSzCd() != null && "".equals(param.getCoSzCd())
				|| commonDAO.findCodeDetail(resultMap).isEmpty()) {
			throw new ValidationException(messageService.get("company.size.not-found", param.getCoSzCd()));
		}
		
		// check company total number of employees
		if (param.getCoTtlEmpNo() != null && param.getCoTtlEmpNo() < 0) {
			throw new ValidationException(messageService.get("company.co-ttl-emp-no.positive-or-zero"));
		}

		// update company
		param.setCoId(coId);
		if (companyDAO.updateCompany(modelMapper.map(param, CompanyEntity.class)) < 1) {
			throw new CustomException(messageService.get("company.update.failed"));
		}

		// delete if necessary
		if (param.getDeletedFilePaths() != null && !param.getDeletedFilePaths().isEmpty()) {
			param.getDeletedFilePaths().forEach(fileService::deleteFileByPath);
		}

		try {
			// add if necessary
			if (param.getFiles() != null && !param.getFiles().isEmpty()) {
				fileService.addFilesToEntity(AppUtil.ENTITY_COMPANY, String.valueOf(coId), param.getFiles());
			}
		} catch (Exception e) {
			fileService.deleteEntityFiles(AppUtil.ENTITY_COMPANY, String.valueOf(coId));
			throw new CustomException(e.getMessage());
		}
		return findCompanyById(coId);
	}

	@Transactional
	@Override
	public void deleteCompany(int coId) {
		// check ID
		if (companyDAO.findCompanyById(coId).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("company.id.not-found", String.valueOf(coId)));
		}

		if (companyDAO.deleteCompany(coId) < 1) {
			throw new CustomException(messageService.get("company.delete.failed"));
		}
		// delete files
		fileService.deleteEntityFiles(AppUtil.ENTITY_COMPANY, String.valueOf(coId));
	}

	@Transactional
	@Override
	public void increaseViewById(int id) {
		// find company
		if (companyDAO.findCompanyById(id).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("company.id.not-found", String.valueOf(id)));
		}

		companyDAO.increaseViewById(id);
	}
}