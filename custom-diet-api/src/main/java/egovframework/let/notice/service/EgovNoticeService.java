package egovframework.let.notice.service;

import egovframework.let.notice.dto.NoticeDto;
import egovframework.let.notice.dto.NoticePagingDto;
import egovframework.let.notice.param.AddNoticeParam;
import egovframework.let.notice.param.FindAllNoticeParam;
import egovframework.let.notice.param.UpdateNoticeParam;

public interface EgovNoticeService {

	NoticePagingDto findAllNotice(FindAllNoticeParam params);

	NoticeDto findNoticeById(int id);

	NoticeDto addNotice(AddNoticeParam param);

	NoticeDto updateNotice(int id, UpdateNoticeParam param);

	void deleteNoticeById(int id);
}