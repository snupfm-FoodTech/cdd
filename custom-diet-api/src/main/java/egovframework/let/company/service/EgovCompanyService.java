package egovframework.let.company.service;

import java.util.List;

import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.let.company.dto.CompanyDto;
import egovframework.let.company.dto.CompanyPagingDto;
import egovframework.let.company.dto.CompanyTypeDto;
import egovframework.let.company.param.AddCompanyParam;
import egovframework.let.company.param.FindAllCompanyParam;
import egovframework.let.company.param.UpdateCompanyParam;

public interface EgovCompanyService {
	
	List<CompanyTypeDto> findAllCompanyType();
	
	List<CommonCodeDto> findAllCompanySize();
	
	CompanyPagingDto findAllCompany(FindAllCompanyParam params);
	
	CompanyDto findCompanyById(int id);
	
	CompanyDto addCompany(AddCompanyParam param);
	
	CompanyDto updateCompany(int coId, UpdateCompanyParam param);
	
	void deleteCompany(int coId);
	
	void increaseViewById(int id);
}