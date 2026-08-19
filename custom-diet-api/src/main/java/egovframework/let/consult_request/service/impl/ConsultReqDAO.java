package egovframework.let.consult_request.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.let.consult_request.dto.ConsultReqDto;
import egovframework.let.consult_request.entity.ConsultReqEntity;

@Repository
public class ConsultReqDAO extends EgovAbstractMapper {
	
	public Optional<Long> countAllConsultReq(Map<String, Object> sqlParam) {
		return Optional.of(selectOne("ConsultReqDAO.countAllConsultReq", sqlParam));
	}
	
	public List<ConsultReqDto> findAllConsultReq(Map<String, Object> sqlParam){
		return selectList("ConsultReqDAO.findAllConsultReq", sqlParam);
	}
	
	public Optional<ConsultReqDto> findConsulReqById(long id) {
		return Optional.ofNullable(selectOne("ConsultReqDAO.findConsulReqById", id));
	}
	
	public int addConsultReq(ConsultReqEntity entity) {
		return insert("ConsultReqDAO.addConsultReq", entity);
	}
}
