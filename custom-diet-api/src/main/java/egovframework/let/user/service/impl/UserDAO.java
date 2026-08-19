package egovframework.let.user.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.let.user.entity.UserEntity;
import egovframework.let.user.entity.UserRoleEntity;


@Repository
public class UserDAO extends EgovAbstractMapper {

	public List<UserEntity> findAllUsers(HashMap<String, Object> userSearchVO) {
		return selectList("UserDAO.findAllUsers", userSearchVO);
	}
	
    public Optional<UserEntity> findUserById(int id) {
		return Optional.ofNullable(selectOne("UserDAO.findUserById", id));
    }
    
    public Optional<UserEntity> findUserByEmail(String email) {
		return Optional.ofNullable(selectOne("UserDAO.findUserByEmail", email));
    }
	
    public int insertUser(UserEntity userEntity) {
		return insert("UserDAO.insertUser", userEntity);
    }
	
    public int updateUser(UserEntity userEntity) {
		return update("UserDAO.updateUser", userEntity);
    }
    
    public int updateUserLstLoginDt(UserEntity userEntity) {
		return update("UserDAO.updateUserLstLoginDt", userEntity);
    }
	
    public int deleteUserById(int id) {
		return delete("UserDAO.deleteUserById", id);
    }
	
    public Integer checkUserPermission(HashMap<String, Object> userSearchVO) {
		return selectOne("UserDAO.checkUserPermission", userSearchVO);
    }
    
    public int addRolesToUser(List<UserRoleEntity> entities) {
		return update("UserDAO.addRolesToUser", entities);
    }
    
    public int changePassword(UserEntity userEntity) {
    	return update("UserDAO.changePassword", userEntity);
    }
}