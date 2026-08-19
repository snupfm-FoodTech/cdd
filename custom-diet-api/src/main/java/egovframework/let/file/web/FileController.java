package egovframework.let.file.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.file.service.FileService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {
	
    private final FileService service;
    
    @GetMapping("/{entityName}/{entityId}")
    public ResponseEntity<ResponseDto> getAllFilesByEntity(
    		@Parameter()
    		@PathVariable("entityName") String entityName, 
    		@PathVariable("entityId") String entityId){
    	return ResponseUtil.get(service.getAllFilesByEntity(entityName, entityId), HttpStatus.OK);
    } 
    
    @GetMapping("/{entityName}/{entityId}/{fileId}")
    public Object getOneFile(@PathVariable("entityName") String entityName, @PathVariable("entityId") String entityId, 
    		@PathVariable("fileId") String fileId) {
    	return service.getOneFile(entityName, entityId, fileId);
    }
    
    @GetMapping("/get-image/{fileName}")
    public Object getImage(@PathVariable("fileName") String fileName) {
    	return service.getImage(fileName);
    }
    
    @PostMapping("/upload-image")
    public ResponseEntity<ResponseDto> uploadImage(@RequestParam(name = "imageFile") MultipartFile imageFile) {
    	return ResponseUtil.get(service.uploadImage(imageFile), HttpStatus.OK);
    }
}






