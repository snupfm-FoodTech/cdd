package egovframework.com.cmm;

import org.egovframe.rte.fdl.cmmn.exception.handler.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class EgovComExcepHndlr implements ExceptionHandler {

    /**
     * 발생된 Exception을 처리한다.
     */
    public void occur(Exception ex, String packageName) {
		log.debug("[HANDLER][PACKAGE]::: {}", packageName);
		log.debug("[HANDLER][Exception]:::", ex);
    }
}
