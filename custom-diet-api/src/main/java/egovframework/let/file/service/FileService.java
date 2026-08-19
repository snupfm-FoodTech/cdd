package egovframework.let.file.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    void init();
    String addFilesToEntity(String entityName, String entityId, List<MultipartFile> files);
    List<String> getAllFilesByEntity(String entityName, String entityId);
    Object getOneFile(String entityName, String entityId, String fileId);
    void deleteEntityFiles(String entityName, String entityId);
    void deleteFileByPath(String path);
    
    Object getImage(String fileName);
    String uploadImage(MultipartFile imageFile);
}
