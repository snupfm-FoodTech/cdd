package egovframework.let.notice.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.validation.ValidationException;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.file.service.FileService;
import egovframework.let.notice.dto.NoticeDto;
import egovframework.let.notice.dto.NoticePagingDto;
import egovframework.let.notice.entity.NoticeEntity;
import egovframework.let.notice.param.AddNoticeParam;
import egovframework.let.notice.param.FindAllNoticeParam;
import egovframework.let.notice.param.UpdateNoticeParam;
import egovframework.let.notice.service.EgovNoticeService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovNoticeServiceImpl extends EgovAbstractServiceImpl implements EgovNoticeService {

	private final NoticeDAO noticeDAO;
	
	private final ModelMapper modelMapper;
	
	private final EgovMessageSource messageService;
	
	private final FileService fileService;
	
	@Override
	public NoticeDto findNoticeById(int id) {
		NoticeEntity entity = noticeDAO.findNoticeById(id).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("notice.id.not-found", String.valueOf(id))));
		NoticeDto dto = modelMapper.map(entity, NoticeDto.class);
		dto.setNtcAtchUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_NOTICE, String.valueOf(id)));
		return dto;
	}

	@Override
	public NoticePagingDto findAllNotice(FindAllNoticeParam params) {
		String orderByField = params.getOrderByField();
		Integer page = params.getPage();
		Integer limit = params.getLimit();
		Boolean isDesc = params.getIsDesc();
		
		// validate
		if (orderByField != null) {
			if (AppUtil.doesFieldExist(orderByField, new NoticeEntity())) { // check whether the field exists
				orderByField = AppUtil.convertEntityFieldToColumn(orderByField);
			} else {
				throw new ValidationException(
						messageService.get("field.not-exist-in-entity", orderByField, AppUtil.ENTITY_NOTICE));
			}
		}

		Integer[] arr = AppUtil.convertPageAndLimit(page, limit);
		HashMap<String, Object> noticeParams = new HashMap<String, Object>();
		noticeParams.put("offset", arr[0]);
		noticeParams.put("limit", arr[1]);
		noticeParams.put("orderByField", orderByField);
		noticeParams.put("isDesc", isDesc);
		noticeParams.put("ntcTit", params.getNtcTit());
		noticeParams.put("ntcCtnt", params.getNtcCtnt());
		List<NoticeEntity> notices = noticeDAO.findAllNotice(noticeParams);

		int totalPageNo = 1;
		if (arr[1] == null) {
			totalPageNo = 1;
		} else if (!notices.isEmpty() && notices.get(0).getTtlNo() > arr[1]) {
			totalPageNo = (int) Math.ceil((double) notices.get(0).getTtlNo() / arr[1]);
		}

		int totalRecordNo = 0;
		if (!notices.isEmpty()) {
			totalRecordNo = notices.get(0).getTtlNo();
		}

		return NoticePagingDto.builder().notices(notices.stream().map(notice -> {
			NoticeDto dto = modelMapper.map(notice, NoticeDto.class);
			dto.setNtcAtchUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_NOTICE, dto.getNtcId().toString()));
			return dto;
		}).toList()).totalPageNo(totalPageNo).totalRecordNo(totalRecordNo).build();
	}

	@Transactional
	@Override
	public NoticeDto addNotice(AddNoticeParam param) {
		NoticeEntity newEntity = modelMapper.map(param, NoticeEntity.class);
		// add knowledge

		newEntity.setNtcAtchUrl("/" + AppUtil.ENTITY_NOTICE + "/"); // id will be added in SQL
		if (noticeDAO.addNotice(newEntity) < 1) {
			throw new CustomException(messageService.get("notice.insert.failed"));
		}
		try {
			// save attachment
			if (param.getFiles() != null && !param.getFiles().isEmpty()) {
				fileService.addFilesToEntity(AppUtil.ENTITY_NOTICE, String.valueOf(newEntity.getNtcId()),
						param.getFiles());
			}
		} catch (Exception e) {
			fileService.deleteEntityFiles(AppUtil.ENTITY_NOTICE, String.valueOf(newEntity.getNtcId()));
			throw new CustomException(e.getMessage());
		}
		return findNoticeById(newEntity.getNtcId());
	}

	@Transactional
	@Override
	public NoticeDto updateNotice(int id, UpdateNoticeParam param) {
		// check ID
		if (noticeDAO.findNoticeById(id).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("notice.id.not-found", String.valueOf(id)));
		}

		// update knowledge
		param.setNtcId(id);
		if (noticeDAO.updateNotice(modelMapper.map(param, NoticeEntity.class)) < 1) {
			throw new CustomException(messageService.get("notice.update.failed"));
		}

		// delete if necessary
		if (param.getDeletedFilePaths() != null && !param.getDeletedFilePaths().isEmpty()) {
			param.getDeletedFilePaths().forEach(fileService::deleteFileByPath);
		}
		try {
			// add if necessary
			if (param.getFiles() != null && !param.getFiles().isEmpty()) {
				fileService.addFilesToEntity(AppUtil.ENTITY_NOTICE, String.valueOf(id), param.getFiles());
			}
		} catch (Exception e) {
			fileService.deleteEntityFiles(AppUtil.ENTITY_NOTICE, String.valueOf(id));
			throw new CustomException(e.getMessage());
		}

		return findNoticeById(id);
	}

	@Override
	public void deleteNoticeById(int id) {
		// validate
		if (noticeDAO.findNoticeById(id).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("notice.id.not-found", String.valueOf(id)));
		}

		if (noticeDAO.deleteNoticeById(id) < 1) {
			throw new CustomException(messageService.get("notice.delete.failed"));
		}

		fileService.deleteEntityFiles(AppUtil.ENTITY_NOTICE, String.valueOf(id));
	}

}