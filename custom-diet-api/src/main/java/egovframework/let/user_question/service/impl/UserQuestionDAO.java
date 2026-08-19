package egovframework.let.user_question.service.impl;

import java.util.List;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.let.user_question.entity.UserQuestionEntity;
import egovframework.let.user_question.param.SearchUserQuestionParam;

@Repository
public class UserQuestionDAO extends EgovAbstractMapper {
	
	public List<UserQuestionEntity> findAllUserQuestions(SearchUserQuestionParam searchUserQuestionParam){
		return selectList("UserQuestionDAO.findAllUserQuestions", searchUserQuestionParam );
	}
	
	public Optional<UserQuestionEntity> findUserQuestionById(int id) {
		return Optional.ofNullable(selectOne("UserQuestionDAO.findUserQuestionById", id));
	}

	@Audited
	public int addUserQuestion(UserQuestionEntity entity) {
		return insert("UserQuestionDAO.addUserQuestion", entity);
	}
	
	@Audited
	public int updateUserQuestion(UserQuestionEntity entity) {
		return update("UserQuestionDAO.updateUserQuestion", entity);
	}
	
	public int deleteUserQuestionById(int id) {
		return delete("UserQuestionDAO.deleteUserQuestionById", id);
    }
}