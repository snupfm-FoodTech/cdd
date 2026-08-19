package egovframework.let.knowledge.service.impl;

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
import egovframework.com.cmm.service.impl.CommonDAO;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.file.service.FileService;
import egovframework.let.knowledge.dto.KnowledgeDto;
import egovframework.let.knowledge.dto.KnowledgePagingDto;
import egovframework.let.knowledge.entity.KnowledgeEntity;
import egovframework.let.knowledge.param.AddKnowledgeParam;
import egovframework.let.knowledge.param.FindAllKnowledgeParam;
import egovframework.let.knowledge.param.UpdateKnowledgeParam;
import egovframework.let.knowledge.service.EgovKnowledgeService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovKnowledgeServiceImpl extends EgovAbstractServiceImpl implements EgovKnowledgeService {

	private final ModelMapper modelMapper;

	private final EgovMessageSource messageService;

	private final FileService fileService;

	private final CommonDAO commonDAO;

	private final KnowledgeDAO knowledgeDAO;

	@Override
	public KnowledgePagingDto findAllKnowledge(FindAllKnowledgeParam params) {
		String orderByField = params.getOrderByField();
		Integer page = params.getPage();
		Integer limit = params.getLimit();
		Boolean isDesc = params.getIsDesc();

		// validate
		if (orderByField != null) {
			if (AppUtil.doesFieldExist(orderByField, new KnowledgeEntity())) { // check whether the field exists
				orderByField = AppUtil.convertEntityFieldToColumn(orderByField);
			} else {
				throw new ValidationException(
						messageService.get("field.not-exist-in-entity", orderByField, AppUtil.ENTITY_COMPANY));
			}
		}

		Integer[] arr = AppUtil.convertPageAndLimit(page, limit);

		// check func type and diet type
		Map<String, Object> knowledgeCdMap = new HashMap<String, Object>();
		knowledgeCdMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_FUNC_TYPE);
		knowledgeCdMap.put("codeId", params.getKwlgFuncTpCd());
		if (params.getKwlgFuncTpCd() != null && commonDAO.findCodeDetail(knowledgeCdMap).isEmpty()) {
			throw new ValidationException(
					messageService.get("knowledge.func-type.not-found", params.getKwlgFuncTpCd()));
		}
		Map<String, Object> knowledgeDietMap = new HashMap<String, Object>();
		knowledgeDietMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_DIET_TYPE);
		knowledgeDietMap.put("codeId", params.getKwlgDietTpCd());
		if (params.getKwlgDietTpCd() != null && commonDAO.findCodeDetail(knowledgeDietMap).isEmpty()) {
			throw new ValidationException(
					messageService.get("knowledge.diet-type.not-found", params.getKwlgDietTpCd()));
		}

		// execute query
		HashMap<String, Object> knowledgeParams = new HashMap<String, Object>();
		knowledgeParams.put("offset", arr[0]);
		knowledgeParams.put("limit", arr[1]);
		knowledgeParams.put("orderByField", orderByField);
		knowledgeParams.put("isDesc", isDesc);
		knowledgeParams.put("kwlgFuncTpCd", params.getKwlgFuncTpCd());
		knowledgeParams.put("kwlgDietTpCd", params.getKwlgDietTpCd());
		knowledgeParams.put("kwlgTit", params.getKwlgTit());
		knowledgeParams.put("creDtFm", params.getCreDtFm());
		knowledgeParams.put("creDtTo", params.getCreDtTo());
		List<KnowledgeEntity> knowledges = knowledgeDAO.findAllKnowledge(knowledgeParams);
		int totalPageNo = 1;
		if (arr[1] == null) {
			totalPageNo = 1;
		} else if (!knowledges.isEmpty() && knowledges.get(0).getTtlNo() > arr[1]) {
			totalPageNo = (int) Math.ceil((double) knowledges.get(0).getTtlNo() / arr[1]);
		}

		int totalRecordNo = 0;
		if (!knowledges.isEmpty()) {
			totalRecordNo = knowledges.get(0).getTtlNo();
		}

		return KnowledgePagingDto.builder().knowledges(knowledges.stream().map(knowledge -> {
			KnowledgeDto dto = modelMapper.map(knowledge, KnowledgeDto.class);
			dto.setKwlgAtchUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_KNOWLEDGE, dto.getKwlgId().toString()));
			return dto;
		}).toList()).totalPageNo(totalPageNo).totalRecordNo(totalRecordNo).build();
	}

	@Override
	public KnowledgeDto findKnowledgeById(int id) {
		KnowledgeEntity knowledge = knowledgeDAO.findKnowledgeById(id)
				.orElseThrow(() -> new CustomNotFoundException(messageService.get("knowledge.id.not-found", id)));
		KnowledgeDto dto = modelMapper.map(knowledge, KnowledgeDto.class);
		dto.setKwlgAtchUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_KNOWLEDGE, String.valueOf(id)));
		return dto;
	}

	@Override
	public List<CommonCodeDto> findAllKnowledgeFuncType() {
		Map<String, Object> cdMap = new HashMap<String, Object>();
		cdMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_FUNC_TYPE);
		cdMap.put("codeId", null);
		return commonDAO.findCodeDetail(cdMap);
	}

	@Override
	public List<CommonCodeDto> findAllKnowledgeDietType() {
		Map<String, Object> cdMap = new HashMap<String, Object>();
		cdMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_DIET_TYPE);
		cdMap.put("codeId", null);
		return commonDAO.findCodeDetail(cdMap);
	}

	@Transactional
	@Override
	public KnowledgeDto addKnowledge(AddKnowledgeParam param) {
		// validate functional type code & dietary type code
		Map<String, Object> cdFncMap = new HashMap<String, Object>();
		cdFncMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_FUNC_TYPE);
		cdFncMap.put("codeId", null);
		Map<String, Object> cdDietMap = new HashMap<String, Object>();
		cdDietMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_DIET_TYPE);
		cdDietMap.put("codeId", null);
		if (commonDAO.findCodeDetail(cdFncMap).isEmpty()) {
			throw new ValidationException(messageService.get("knowledge.func-type.not-found", param.getKwlgFuncTpCd()));
		}
		if (commonDAO.findCodeDetail(cdDietMap).isEmpty()) {
			throw new ValidationException(messageService.get("knowledge.diet-type.not-found", param.getKwlgDietTpCd()));
		}
		KnowledgeEntity newEntity = modelMapper.map(param, KnowledgeEntity.class);
		// add knowledge
		newEntity.setKwlgAtchUrl("/" + AppUtil.ENTITY_KNOWLEDGE + "/"); // id will be added in SQL
		if (knowledgeDAO.addKnowledge(newEntity) < 1) {
			throw new CustomException(messageService.get("knowledge.insert.failed"));
		}

		try {
			// save attachment
			if (param.getFiles() != null && !param.getFiles().isEmpty()) {
				fileService.addFilesToEntity(AppUtil.ENTITY_KNOWLEDGE, String.valueOf(newEntity.getKwlgId()),
						param.getFiles());
			}
		} catch (Exception e) {
			fileService.deleteEntityFiles(AppUtil.ENTITY_KNOWLEDGE, String.valueOf(newEntity.getKwlgId()));
			throw new CustomException(e.getMessage());
		}

		return findKnowledgeById(newEntity.getKwlgId());
	}

	@Transactional
	@Override
	public KnowledgeDto updateKnowledge(int id, UpdateKnowledgeParam param) {
		// check ID
		Optional<KnowledgeEntity> optKnowledge = knowledgeDAO.findKnowledgeById(id);
		if (optKnowledge.isEmpty()) {
			throw new CustomNotFoundException(messageService.get("knowledge.id.not-found", String.valueOf(id)));
		}

		// validate knowledge types
		Map<String, Object> cdFncMap = new HashMap<String, Object>();
		cdFncMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_FUNC_TYPE);
		cdFncMap.put("codeId", param.getKwlgFuncTpCd());
		Map<String, Object> cdDietMap = new HashMap<String, Object>();
		cdDietMap.put("intgCd", AppUtil.CODE_KNOWLEDGE_DIET_TYPE);
		cdDietMap.put("codeId", param.getKwlgDietTpCd());
		if (param.getKwlgFuncTpCd() != null && "".equals(param.getKwlgFuncTpCd())
				|| commonDAO.findCodeDetail(cdFncMap).isEmpty()) {
			throw new ValidationException(messageService.get("knowledge.func-type.not-found", param.getKwlgFuncTpCd()));
		}
		if (param.getKwlgDietTpCd() != null && "".equals(param.getKwlgDietTpCd())
				|| commonDAO.findCodeDetail(cdDietMap).isEmpty()) {
			throw new ValidationException(messageService.get("knowledge.diet-type.not-found", param.getKwlgDietTpCd()));
		}

		// update knowledege
		param.setKwlgId(id);
		if (knowledgeDAO.updateKnowledge(modelMapper.map(param, KnowledgeEntity.class)) < 1) {
			throw new CustomException(messageService.get("knowledge.update.failed"));
		}

		// delete if necessary
		if (param.getDeletedFilePaths() != null && !param.getDeletedFilePaths().isEmpty()) {
			param.getDeletedFilePaths().forEach(fileService::deleteFileByPath);
		}
		try {
			// add if necessary
			if (param.getFiles() != null && !param.getFiles().isEmpty()) {
				fileService.addFilesToEntity(AppUtil.ENTITY_KNOWLEDGE, String.valueOf(id), param.getFiles());
			}
		} catch (Exception e) {
			fileService.deleteEntityFiles(AppUtil.ENTITY_KNOWLEDGE, String.valueOf(id));
			throw new CustomException(e.getMessage());
		}
		return findKnowledgeById(id);
	}

	@Override
	public void deleteKnowledgeById(int id) {
		// validate
		if (knowledgeDAO.findKnowledgeById(id).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("knowledge.id.not-found", String.valueOf(id)));
		}

		if (knowledgeDAO.deleteKnowledgeById(id) < 1) {
			throw new CustomException(messageService.get("company.delete.failed"));
		}

		fileService.deleteEntityFiles(AppUtil.ENTITY_KNOWLEDGE, String.valueOf(id));
	}

	@Transactional
	@Override
	public void increaseViewById(int id) {
		// find knowledge
		if (knowledgeDAO.findKnowledgeById(id).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("knowledge.id.not-found", String.valueOf(id)));
		}

		knowledgeDAO.increaseViewById(id);
	}

}