package egovframework.com.cmm.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.dto.CommonCodeDto;


@Repository
public class CommonDAO extends EgovAbstractMapper {
	
	public List<CommonCodeDto> findCodeDetail(Map<?, ?> map) {
		return selectList("CommonDAO.findCodeDetail", map);
	}
}