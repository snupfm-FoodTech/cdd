package egovframework.let.solution.service;

import egovframework.com.cmm.dto.PagingWrapper;
import egovframework.com.cmm.param.BasePagingParam;
import egovframework.let.solution.dto.SolutionContentDto;
import egovframework.let.solution.dto.SolutionTypeDto;
import egovframework.let.solution.param.AddSolutionContentParam;
import egovframework.let.solution.param.AddSolutionTypeParam;
import egovframework.let.solution.param.FindAllSolutionContentParam;
import egovframework.let.solution.param.UpdateSolutionContentParam;
import egovframework.let.solution.param.UpdateSolutionTypeParam;

public interface EgovSolutionService {
	PagingWrapper<SolutionTypeDto> findAllSolutionType(BasePagingParam param);
	SolutionTypeDto findSolutionTypeById(long id);
	SolutionTypeDto addNewSolutionType(AddSolutionTypeParam param);
	SolutionTypeDto updateSolutionType(UpdateSolutionTypeParam param);
	void deleteSolutionTypeById(long id);
	
	PagingWrapper<SolutionContentDto> findAllSolutionContent(FindAllSolutionContentParam param);
	SolutionContentDto findSolutionContentById(long id);
	SolutionContentDto addNewSolutionContent(AddSolutionContentParam param);
	SolutionContentDto updateSolutionContent(UpdateSolutionContentParam param);
	SolutionContentDto updateSolutionContentDescription(long id, Object description);
	void deleteSolutionContentById(long id);
}