package egovframework.let.knowledge.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.let.knowledge.entity.KnowledgeEntity;

@Repository
public class KnowledgeDAO extends EgovAbstractMapper {
	
	public List<KnowledgeEntity> findAllKnowledge(HashMap<String, Object> searchKnowledgeParam){
		return selectList("KnowledgeDAO.findAllKnowledge", searchKnowledgeParam );
	}
	
	public Optional<KnowledgeEntity> findKnowledgeById(int id) {
		return Optional.ofNullable(selectOne("KnowledgeDAO.findKnowledgeById", id));
	}

	@Audited
	public int addKnowledge(KnowledgeEntity entity) {
		return insert("KnowledgeDAO.addKnowledge", entity);
	}
	
	@Audited
	public int updateKnowledge(KnowledgeEntity entity) {
		return update("KnowledgeDAO.updateKnowledge", entity);
	}
	
	public int deleteKnowledgeById(int id) {
		return delete("KnowledgeDAO.deleteKnowledgeById", id);
    }
		
	public void increaseViewById(int id) {
		update("KnowledgeDAO.increaseViewById", id);
	}
}