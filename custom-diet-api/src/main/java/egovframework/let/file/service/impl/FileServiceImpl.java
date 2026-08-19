package egovframework.let.file.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.validation.ValidationException;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.exception.CustomFileUploadException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.file.service.FileService;
import egovframework.let.file.service.FileUtil;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
	
	private final EgovMessageSource messageService;
	private static final String IMAGE_EXT = ".png"; // enforce only PNG
	
	@Value("${Globals.PublicUrl}")
	private String PUBLIC_URL;

	public FileServiceImpl(@Autowired EgovMessageSource messageService) {
		this.messageService = messageService;
		init();
	}

	@Override
	public void init() {
		try {
			Files.createDirectories(FileUtil.ROOT);
			log.info("Created ROOT for file uploads");
		} catch (IOException e) {
			throw new CustomFileUploadException(messageService.get("file.init.failed"));
		}
	}

	@Override
	public Object getOneFile(String entityName, String entityId, String fileId) {
		if (!AppUtil.isEntityValid(entityName)) {
			throw new CustomNotFoundException(messageService.get("file.entity.not-exist", entityName));
		}
		Path path = getPath(entityName, entityId).resolve(fileId);

		switch (getFileExtension(fileId)) {
		case ".png":
			try {
				Resource resource = new UrlResource(path.toUri());
				if (!resource.exists() || !resource.isReadable()) {
					throw new CustomNotFoundException(messageService.get("file.not-found", fileId));
				}
				return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
			} catch (MalformedURLException e) {
				log.error(e.getMessage());
				throw new CustomException(e.getMessage());
			}
		case ".pdf":
			try {
				File pdfFile = new File(path.toUri());
				InputStreamResource resource = new InputStreamResource(new FileInputStream(pdfFile));
				if (!resource.exists() || !resource.isReadable()) {
					throw new CustomNotFoundException(messageService.get("file.not-found", fileId));
				}
				HttpHeaders headers = new HttpHeaders();
				// inline for display
				headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + pdfFile.getName());
				return ResponseEntity.ok().headers(headers).contentLength(pdfFile.length())
						.contentType(MediaType.APPLICATION_PDF).body(resource);
			} catch (FileNotFoundException e) {
				log.error(e.getMessage());
				throw new CustomException(e.getMessage());
			}
		case ".doc", ".docx", ".dot", ".dotx", ".docm", ".dotm": // word document
			try {
				File wordFile = new File(path.toUri());
				InputStreamResource resource = new InputStreamResource(new FileInputStream(wordFile));
				if (!resource.exists() || !resource.isReadable()) {
					throw new CustomNotFoundException(messageService.get("file.not-found", fileId));
				}
				HttpHeaders headers = new HttpHeaders();
				// attachment for download
				headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + wordFile.getName());
				return ResponseEntity.ok().headers(headers).body(resource);
			} catch (FileNotFoundException e) {
				log.error(e.getMessage());
				throw new CustomException(e.getMessage());
			}
		case ".xls", ".xlsx", ".xlsm", ".xlsb", ".xlt", ".xltx", "xltm": // excel document
			try {
				File excelFile = new File(path.toUri());
				InputStreamResource resource = new InputStreamResource(new FileInputStream(excelFile));
				if (!resource.exists() || !resource.isReadable()) {
					throw new CustomNotFoundException(messageService.get("file.not-found", fileId));
				}
				HttpHeaders headers = new HttpHeaders();
				// attachment for download
				headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + excelFile.getName());
				return ResponseEntity.ok().headers(headers).body(resource);
			} catch (FileNotFoundException e) {
				log.error(e.getMessage());
				throw new CustomException(e.getMessage());
			}
		default:
			throw new CustomException(messageService.get("file.extension.invalid"));
		}
	}

	@Override
	public List<String> getAllFilesByEntity(String entityName, String entityId) {
		if (!AppUtil.isEntityValid(entityName)) {
			throw new CustomNotFoundException(messageService.get("file.entity.not-exist", entityName));
		}
		Path path = getPath(entityName, entityId);
		List<String> filePaths = new ArrayList<>();
		if (!Files.exists(path)) {
			return Collections.emptyList();
		}
		try {
			filePaths.addAll(Files.list(path)
					.map(file -> String.format("%s/%s/%s", entityName, entityId, file.getFileName())).toList());
		} catch (IOException e) {
			log.error(e.getMessage());
			throw new CustomException(e.getMessage());
		}

		return filePaths;
	}

	@Override
	public String addFilesToEntity(String entityName, String entityId, List<MultipartFile> files) {
		if (!AppUtil.isEntityValid(entityName)) {
			throw new CustomNotFoundException(messageService.get("file.entity.not-exist", entityName));
		}
		validateFileType(entityName, files);

		Path path = getPath(entityName, entityId);
		if (!Files.exists(path)) {
			try {
				Files.createDirectories(path);
			} catch (IOException e) {
				log.error(e.getMessage());
				throw new CustomException(e.getMessage());
			}
		}
		files.forEach(file -> {
			try {
				Files.copy(file.getInputStream(), path.resolve(generateNewFileName(file)));
			} catch (IOException e) {
				log.error(e.getMessage());
				throw new CustomException(e.getMessage());
			}
		});
		return entityName + "/" + entityId;
	}

	@Override
	public void deleteEntityFiles(String entityName, String entityId) {
		try {
			if (!AppUtil.isEntityValid(entityName)) {
				throw new CustomNotFoundException(messageService.get("file.entity.not-exist", entityName));
			}
			FileUtils.deleteDirectory(getPath(entityName, entityId).toFile());
		} catch (IOException e) {
			log.error(e.getMessage());
			throw new CustomException(e.getMessage());
		}
	}

	@Override
	public void deleteFileByPath(String path) {
		try {
			Files.delete(getPath(path));
		} catch (NoSuchFileException e) {
			log.error("File doesn't exist at path : " + path);
		} catch (IOException e) {
			log.error("Cannot delete file at path : " + path);
		}
	}

	private Path getPath(String entityName, String entityId) {
		return FileUtil.ROOT.resolve(String.format("%s/%s", entityName, entityId));
	}

	private Path getPath(String path) {
		return FileUtil.ROOT.resolve(path);
	}

	private String generateNewFileName(MultipartFile file) {
		String originalName = file.getOriginalFilename();
		if (originalName == null) {
			throw new ValidationException(messageService.get("file.name.not-null"));
		}
		String dateStr = new SimpleDateFormat("yyMMddHHmmssSSS").format(new Date()).toString();
		if (file.getContentType().startsWith("image")) { // if image, force it to be .png
			return dateStr + "_" + getFilenameWithoutExtension(originalName) + ".png";
		}
		return dateStr + "_" + originalName;
	}

	private String getFileExtension(String fileName) {
		int lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex == -1) {
			throw new ValidationException(messageService.get("file.no-extension"));
		}
		return fileName.substring(lastDotIndex);
	}

	private String getFilenameWithoutExtension(String originalFilename) {
		if (originalFilename == null) {
			return null;
		}
		int lastDotIndex = originalFilename.lastIndexOf('.');
		if (lastDotIndex == -1) {
			return originalFilename; // No extension found
		}
		return originalFilename.substring(0, lastDotIndex);
	}

	private void validateFileType(String entityName, List<MultipartFile> files) {
		if (entityName == null || "".equals(entityName)) {
			throw new ValidationException(messageService.get("file.entity-name.not-null"));
		}
		switch (entityName) {
		case AppUtil.ENTITY_COMPANY, AppUtil.ENTITY_SOLUTION_TYPE, AppUtil.ENTITY_SOLUTION_CONTENT:
			files.stream().forEach(file -> {
				if (!isFileAnImage(file)) {
					throw new ValidationException(messageService.get("file.company-file.invalid"));
				}
			});
			break;
		default:
			files.stream().forEach(file -> {
				if (!isFileAnImage(file) && !isFileAPdf(file) && !isFileAWordDocument(file)
						&& !isFileAnExcelDocument(file)) {
					throw new ValidationException(messageService.get("file.type.invalid", file.getContentType()));
				}
			});
		}
	}

	private String getFileContentType(MultipartFile file) {
		if (file == null) {
			throw new ValidationException(messageService.get("file.not-null"));
		}
		if (file.getContentType() == null || "".equals(file.getContentType())) {
			throw new ValidationException(messageService.get("file.content-type.not-empty"));
		}
		return file.getContentType();
	}

	private boolean isFileAnImage(MultipartFile file) {
		return getFileContentType(file).startsWith("image");
	}

	private boolean isFileAPdf(MultipartFile file) {
		return getFileContentType(file).equals("application/pdf");
	}

	private boolean isFileAWordDocument(MultipartFile file) {
		String contentType = getFileContentType(file);
		return "application/msword".equals(contentType)
				|| "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(contentType)
				|| "application/vnd.openxmlformats-officedocument.wordprocessingml.template".equals(contentType)
				|| "application/vnd.ms-word.document.macroEnabled.12".equals(contentType)
				|| "application/vnd.ms-word.template.macroEnabled.12".equals(contentType);
	}

	private boolean isFileAnExcelDocument(MultipartFile file) {
		String contentType = getFileContentType(file);
		return "application/vnd.ms-excel".equals(contentType)
				|| "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(contentType)
				|| "application/vnd.ms-excel.sheet.macroEnabled.12".equals(contentType)
				|| "application/vnd.ms-excel.sheet.binary.macroEnabled.12".equals(contentType)
				|| "application/vnd.openxmlformats-officedocument.spreadsheetml.template".equals(contentType)
				|| "application/vnd.ms-excel.template.macroEnabled.12".equals(contentType);
	}
	
	private Path buildImagePath(String fileName) {
	    String uuid = fileName.replace(IMAGE_EXT, ""); // strip extension
	    return FileUtil.ROOT.resolve("files")
	            .resolve(uuid.substring(0, 2))
	            .resolve(uuid.substring(2, 4))
	            .resolve(fileName) // already has .png
	            .normalize();
	}
	
	@Override
	public ResponseEntity<Resource> getImage(String fileName) {
	    try {
	        Path path = buildImagePath(fileName);

	        if (!Files.exists(path)) {
	            throw new CustomNotFoundException(messageService.get("file.not-found", fileName));
	        }

	        Resource resource = new UrlResource(path.toUri());
	        if (!resource.exists() || !resource.isReadable()) {
	            throw new CustomNotFoundException(messageService.get("file.not-readable", fileName));
	        }

	        return ResponseEntity.ok()
	                .contentType(MediaType.IMAGE_PNG)
	                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
	                .body(resource);

	    } catch (MalformedURLException e) {
	        log.error(e.getMessage(), e);
	        throw new CustomException("Invalid file path: " + fileName);
	    }
	}

	@Override
	public String uploadImage(MultipartFile imageFile) {
	    if (!isFileAnImage(imageFile)) {
	        throw new ValidationException(messageService.get("file.extension.invalid"));
	    }

	    String uuid = UUID.randomUUID().toString();
	    String fileName = uuid + IMAGE_EXT;
	    Path path = buildImagePath(fileName);

	    try {
	        Files.createDirectories(path.getParent());
	        Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
	    } catch (IOException e) {
	        log.error(e.getMessage(), e);
	        throw new CustomException(e.getMessage());
	    }

	    return String.format("%s/files/get-image/%s", PUBLIC_URL, fileName);
	}
}