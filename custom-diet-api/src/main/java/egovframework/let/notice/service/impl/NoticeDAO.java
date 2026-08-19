package egovframework.let.notice.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.let.notice.entity.NoticeEntity;

@Repository
public class NoticeDAO extends EgovAbstractMapper {
	
	public List<NoticeEntity> findAllNotice(HashMap<String, Object> noticeParam) {
		return selectList("NoticeDAO.findAllNotice", noticeParam);
	}
	
	public Optional<NoticeEntity> findNoticeById(int id) {
		return Optional.ofNullable(selectOne("NoticeDAO.findNoticeById", id));
	}

	@Audited
	public int addNotice(NoticeEntity notice) {
		return insert("NoticeDAO.addNotice", notice);
	}
	
	@Audited
	public int updateNotice(NoticeEntity notice) {
		return update("NoticeDAO.updateNotice", notice);
	}
	
	public int deleteNoticeById(int id) {
		return delete("NoticeDAO.deleteNoticeById", id);
    }
}