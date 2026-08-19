package egovframework.let.faq.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.let.faq.entity.FaqEntity;

@Repository
public class FaqDAO extends EgovAbstractMapper {
	
	public List<FaqEntity> findAllFaq(HashMap<String, Object> faqParam) {
		return selectList("FaqDAO.findAllFaq", faqParam);
	}
	
	public Optional<FaqEntity> findFaqById(int id) {
		return Optional.ofNullable(selectOne("FaqDAO.findFaqById", id));
	}

	@Audited
	public int addFaq(FaqEntity faq) {
		return insert("FaqDAO.addFaq", faq);
	}
	
	@Audited
	public int updateFaqById(FaqEntity faq) {
		return update("FaqDAO.updateFaqById", faq);
	}
	
	public int deleteFaqById(int id) {
		return delete("FaqDAO.deleteFaqById", id);
    }
}