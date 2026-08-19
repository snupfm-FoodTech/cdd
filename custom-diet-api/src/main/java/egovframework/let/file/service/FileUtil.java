package egovframework.let.file.service;

import java.nio.file.Path;
import java.nio.file.Paths;

import lombok.experimental.UtilityClass;

@UtilityClass
public class FileUtil {
    public static final String IMG_SUFFIX = ".png";
    public static final Path ROOT = Paths.get("./src/main/resources/uploads");
}
