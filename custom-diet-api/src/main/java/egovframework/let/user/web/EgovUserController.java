package egovframework.let.user.web;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.aop.authorization.Authorized;
import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import egovframework.let.user.param.InsertUserParam;
import egovframework.let.user.param.UpdateUserParam;
import egovframework.let.user.service.EgovUserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Validated
public class EgovUserController {
	
	public static final String HEADER_STRING = "Authorization";

	/** mberManageService */
	private final EgovUserService userService;

	@GetMapping
	public ResponseEntity<ResponseDto> findAllUsers(
			@RequestParam(name = "page", required = false) @NullOrPositiveNo(fieldName = "page") Integer page,
			@RequestParam(name = "limit", required = false) @NullOrPositiveNo(fieldName = "limit") Integer limit,
			@RequestParam(name = "orderByField", required = false) String orderByField,
			@RequestParam(name = "isDesc", defaultValue = "false") Boolean isDesc,
			@RequestParam(name = "name", required = false) String usrNm,
			@RequestParam(name = "email", required = false) String usrEml
			) throws Exception {
		return ResponseUtil.get(userService.findAllUsers(page, limit, orderByField, isDesc, usrNm, usrEml), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDto> findUserById(@PathVariable("id") int id) {
		return ResponseUtil.get(userService.findUserById(id), HttpStatus.OK);
	}

	@Authorized
	@PostMapping
	public ResponseEntity<ResponseDto> insertUser(@Valid @RequestBody InsertUserParam dto) {
		return ResponseUtil.get(userService.insertUser(dto), HttpStatus.CREATED);
	}
	
	@Authorized
	@PostMapping("/reset-password/{id}")
	public ResponseEntity<ResponseDto> resetUserPassword(@PathVariable("id") int id) {
		return ResponseUtil.get(userService.resetUserPassword(id), HttpStatus.CREATED);
	}

	@Authorized
	@PutMapping("/{id}")
	public ResponseEntity<ResponseDto> updateUser(@PathVariable("id") int id, @Valid @RequestBody UpdateUserParam dto) {
		dto.setId(id);
		return ResponseUtil.get(userService.updateUser(dto), HttpStatus.OK);
	}
	
	@Authorized
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDto> deleteUserById(@PathVariable("id") int id) {
		userService.deleteUserById(id);
		return ResponseUtil.get(null, HttpStatus.NO_CONTENT);
	} 
}