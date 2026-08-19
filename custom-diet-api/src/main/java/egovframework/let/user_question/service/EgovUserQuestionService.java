package egovframework.let.user_question.service;

import egovframework.let.user_question.dto.UserQuestionDto;
import egovframework.let.user_question.dto.UserQuestionPagingDto;
import egovframework.let.user_question.param.AddUserQuestionParam;
import egovframework.let.user_question.param.AnswerUserQuestionParam;

public interface EgovUserQuestionService {
	
	UserQuestionPagingDto findAllUserQuestions(Integer page, Integer limit, String orderByField, Boolean isDesc, String queTit, Integer queUsrId);
	
	UserQuestionDto findUserQuestionById(int id);
	
	UserQuestionDto addUserQuestion(AddUserQuestionParam param);
	
	UserQuestionDto answerUserQuestion(AnswerUserQuestionParam param);
	
	void deleteUserQuestionById(int id);
}