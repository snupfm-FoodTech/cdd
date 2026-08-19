package egovframework.let.knowledge.service;

import java.util.List;

import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.let.knowledge.dto.KnowledgeDto;
import egovframework.let.knowledge.dto.KnowledgePagingDto;
import egovframework.let.knowledge.param.AddKnowledgeParam;
import egovframework.let.knowledge.param.FindAllKnowledgeParam;
import egovframework.let.knowledge.param.UpdateKnowledgeParam;

public interface EgovKnowledgeService {
	
	KnowledgePagingDto findAllKnowledge(FindAllKnowledgeParam params);
	
	KnowledgeDto findKnowledgeById(int id);
	
	List<CommonCodeDto> findAllKnowledgeFuncType();
	
	List<CommonCodeDto> findAllKnowledgeDietType();
	
	KnowledgeDto addKnowledge(AddKnowledgeParam param);
	
	KnowledgeDto updateKnowledge(int id, UpdateKnowledgeParam param);
	
	void deleteKnowledgeById(int id);
	
	void increaseViewById(int id);
}