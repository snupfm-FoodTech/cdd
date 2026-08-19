package egovframework.let.role;

import java.util.List;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDAO extends EgovAbstractMapper {
	
	public RoleEntity findRoleByCode(String roleCode) {
		return selectOne("RoleDAO.findRoleByCode", roleCode);
	}
	
    public List<RoleEntity> findAllRoleByUserId(int id) {
		return selectList("RoleDAO.findAllRoleByUserId", id);
    }
}

