package egovframework.let.user.service;

import egovframework.let.user.dto.UserDto;
import egovframework.let.user.dto.UserPagingDto;
import egovframework.let.user.param.InsertUserParam;
import egovframework.let.user.param.UpdateUserParam;

public interface EgovUserService {

	public UserPagingDto findAllUsers(Integer page, Integer limit, String orderByField, Boolean isDesc, String usrNm,
			String usrEml) throws Exception;
	
	public UserDto findUserById(int id);
	
	public UserDto insertUser(InsertUserParam dto);
	
	public UserDto updateUser(UpdateUserParam dto);
	
	public void deleteUserById(int id);
	
	public Integer checkUserPermission(int id, String resource, String action);

	public String resetUserPassword(int id);
}