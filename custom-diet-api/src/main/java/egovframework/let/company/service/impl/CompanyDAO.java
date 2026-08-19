package egovframework.let.company.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.let.company.entity.CompanyEntity;
import egovframework.let.company.entity.CompanyTypeEntity;

@Repository
public class CompanyDAO extends EgovAbstractMapper {
	
	public Optional<CompanyTypeEntity> findCompanyTypeById(int coTpId) {
		return Optional.ofNullable(selectOne("CompanyDAO.findCompanyTypeById", coTpId));
	}
	
	public List<CompanyTypeEntity> findAllCompanyType(){
		return selectList("CompanyDAO.findAllCompanyType");
	}
	
	public List<CompanyEntity> findAllCompany(HashMap<String, Object> companySearchParam){
		return selectList("CompanyDAO.findAllCompany", companySearchParam);
	}
	
	public Optional<CompanyEntity> findCompanyById(int id) {
		return Optional.ofNullable(selectOne("CompanyDAO.findCompanyById", id));
	}

	@Audited
	public int addCompany(CompanyEntity company) {
		return insert("CompanyDAO.addCompany", company);
	}
	
	@Audited
	public int updateCompany(CompanyEntity company) {
		return update("CompanyDAO.updateCompany", company);
	}
	
	public int deleteCompany(int id) {
		return delete("CompanyDAO.deleteCompany", id);
    }
		
	public void increaseViewById(int id) {
		update("CompanyDAO.increaseViewById", id);
	}
}