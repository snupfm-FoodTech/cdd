package egovframework.let.solution.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.let.solution.dto.SolutionContentDto;
import egovframework.let.solution.dto.SolutionTypeDto;
import egovframework.let.solution.entity.SolutionContentEntity;
import egovframework.let.solution.entity.SolutionTypeEntity;

@Repository
public class SolutionDAO extends EgovAbstractMapper {
	
	public Optional<Long> countAllSolutionType(Map<String, Object> sqlParam) {
		return Optional.of(selectOne("SolutionDAO.countAllSolutionType", sqlParam));
	}
	
	public List<SolutionTypeDto> findAllSolutionType(Map<String, Object> sqlParam){
		return selectList("SolutionDAO.findAllSolutionType", sqlParam);
	}
	
	public Optional<SolutionTypeDto> findSolutionTypeById(long id) {
		return Optional.ofNullable(selectOne("SolutionDAO.findSolutionTypeById", id));
	}

	@Audited
	public int addSolutionType(SolutionTypeEntity entity) {
		return insert("SolutionDAO.addSolutionType", entity);
	}
	
	@Audited
	public int updateSolutionType(SolutionTypeEntity entity) {
		return update("SolutionDAO.updateSolutionType", entity);
	}
	
	public int deleteSolutionType(long id) {
		return delete("SolutionDAO.deleteSolutionType", id);
	}
	
	//---------------------------------------------------------------------------------------------
	public List<Long> findAllSolutionContentIdByType(long typeId) {
		return selectList("SolutionDAO.findAllSolutionContentIdByType", typeId);
	}
	
	public Optional<Long> countAllSolutionContent(Map<String, Object> sqlParam) {
		return Optional.of(selectOne("SolutionDAO.countAllSolutionContent", sqlParam));
	}
	
	public List<SolutionContentDto> findAllSolutionContent(Map<String, Object> sqlParam){
		return selectList("SolutionDAO.findAllSolutionContent", sqlParam);
	}
	
	
	public Optional<SolutionContentDto> findSolutionContentById(long id) {
		return Optional.ofNullable(selectOne("SolutionDAO.findSolutionContentById", id));
	}
	
	@Audited
	public int addSolutionContent(SolutionContentEntity entity) {
		return insert("SolutionDAO.addSolutionContent", entity);
	}
	
	@Audited
	public int updateSolutionContent(SolutionContentEntity entity) {
		return update("SolutionDAO.updateSolutionContent", entity);
	}
	
	public int deleteSolutionContent(long id) {
		return delete("SolutionDAO.deleteSolutionContent", id);
	}
}