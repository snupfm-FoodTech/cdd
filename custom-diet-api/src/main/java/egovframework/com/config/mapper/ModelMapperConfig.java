package egovframework.com.config.mapper;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.let.diet.dto.DietFoodDto;
import egovframework.let.diet.dto.DietNutrientDto;
import egovframework.let.diet.entity.DietAccessoryEntity;
import egovframework.let.diet.entity.DietEntity;
import egovframework.let.diet.entity.DietNutritionSummaryEntity;
import egovframework.let.diet.entity.DietStandardDetailEntity;
import egovframework.let.diet.entity.DietTrayDetailEntity;
import egovframework.let.diet.entity.UserTrayDetailEntity;
import egovframework.let.diet.entity.UserTrayEntity;
import egovframework.let.diet.param.AddDietParam;
import egovframework.let.diet.param.AddNutritionSummaryToDietParam;
import egovframework.let.diet.param.AddPriceToDietAccessoryParam;
import egovframework.let.diet.param.DietFoodParam;
import egovframework.let.diet.param.DietNutrientParam;
import egovframework.let.diet.param.DietTrayParam;
import egovframework.let.diet.param.UpdateDietParam;
import egovframework.let.user.entity.UserEntity;
import egovframework.let.user.param.SelfUpdateUserParam;


@Component
public class ModelMapperConfig {
	private static final ObjectMapper objectMapper = new ObjectMapper();

	@Bean
	ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		addCommonMappings(modelMapper);
		addUserMappings(modelMapper);
		addDietMappings(modelMapper);
		return modelMapper;
	}

	public static ObjectMapper getObjectMapper() {
		return objectMapper;
	}

	private void addCommonMappings(ModelMapper modelMapper) {
		// Custom converter: Date to LocalDateTime
		modelMapper.addConverter(new Converter<Date, LocalDateTime>() {
			@Override
			public LocalDateTime convert(MappingContext<Date, LocalDateTime> context) {
				Date source = context.getSource();
				return source == null ? null
						: LocalDateTime.ofInstant(Instant.ofEpochMilli(source.getTime()), ZoneId.systemDefault());
			}
		});
	}

	private void addUserMappings(ModelMapper modelMapper) {
		modelMapper.typeMap(SelfUpdateUserParam.class, UserEntity.class).addMappings(mapper -> {
			mapper.map(SelfUpdateUserParam::getName, UserEntity::setUsrNm);
			mapper.map(SelfUpdateUserParam::getPhoneNo, UserEntity::setUsrPhnNo);
			mapper.map(SelfUpdateUserParam::getNewPassword, UserEntity::setUsrPwd);
		});
	}

	private void addDietMappings(ModelMapper modelMapper) {
		modelMapper.typeMap(DietTrayParam.class, UserTrayEntity.class).addMappings(mapper -> {
			mapper.map(DietTrayParam::getName, UserTrayEntity::setTrayNm);
			mapper.map(DietTrayParam::getRepresentativeTrayCode, UserTrayEntity::setRepTrayCd);
		});

		modelMapper.typeMap(DietFoodParam.class, UserTrayDetailEntity.class).addMappings(mapper -> {
			mapper.map(DietFoodParam::getMandatoryFlag, UserTrayDetailEntity::setFdMandFlg);
			mapper.map(DietFoodParam::getSeparatedFlag, UserTrayDetailEntity::setFdSepFlg);
			mapper.map(DietFoodParam::getCapacityVolume, UserTrayDetailEntity::setFdCapaVol);
			mapper.map(DietFoodParam::getTypeCode, UserTrayDetailEntity::setFdTpCd);
		});

		modelMapper.typeMap(AddDietParam.class, DietEntity.class).addMappings(mapper -> {
			mapper.map(AddDietParam::getName, DietEntity::setDietNm);
			mapper.map(AddDietParam::getDescription, DietEntity::setDietDesc);
			mapper.map(AddDietParam::getStandardCode, DietEntity::setStdCd);
			mapper.map(AddDietParam::getStandardName, DietEntity::setStdNm);
		});

		modelMapper.typeMap(UpdateDietParam.class, DietEntity.class).addMappings(mapper -> {
			mapper.map(UpdateDietParam::getName, DietEntity::setDietNm);
			mapper.map(UpdateDietParam::getDescription, DietEntity::setDietDesc);
			mapper.map(UpdateDietParam::getStandardCode, DietEntity::setStdCd);
			mapper.map(UpdateDietParam::getStandardName, DietEntity::setStdNm);
		});

		modelMapper.typeMap(DietNutrientParam.class, DietStandardDetailEntity.class).addMappings(mapper -> {
			mapper.map(DietNutrientParam::getCode, DietStandardDetailEntity::setNutrCd);
			mapper.map(DietNutrientParam::getMandatoryFlag, DietStandardDetailEntity::setNutrMandFlg);
			mapper.map(DietNutrientParam::getWeightFrom, DietStandardDetailEntity::setNutrWgtFm);
			mapper.map(DietNutrientParam::getWeightTo, DietStandardDetailEntity::setNutrWgtTo);
			mapper.map(DietNutrientParam::getFormula, DietStandardDetailEntity::setNutrFormula);
		});

		modelMapper.typeMap(DietFoodDto.class, DietTrayDetailEntity.class).addMappings(mapper -> {
			mapper.map(DietFoodDto::getDietId, DietTrayDetailEntity::setDietId);
			mapper.map(DietFoodDto::getSequence, DietTrayDetailEntity::setFdSeq);
			mapper.map(DietFoodDto::getMandatoryFlag, DietTrayDetailEntity::setFdMandFlg);
			mapper.map(DietFoodDto::getSeparatedFlag, DietTrayDetailEntity::setFdSepFlg);
			mapper.map(DietFoodDto::getCapacityVolume, DietTrayDetailEntity::setFdCapaVol);
			mapper.map(DietFoodDto::getUnitCode, DietTrayDetailEntity::setUnitCd);
			mapper.map(DietFoodDto::getTypeCode, DietTrayDetailEntity::setFdTpCd);
		});

		modelMapper.typeMap(DietFoodParam.class, DietTrayDetailEntity.class).addMappings(mapper -> {
			mapper.map(DietFoodParam::getMandatoryFlag, DietTrayDetailEntity::setFdMandFlg);
			mapper.map(DietFoodParam::getSeparatedFlag, DietTrayDetailEntity::setFdSepFlg);
			mapper.map(DietFoodParam::getCapacityVolume, DietTrayDetailEntity::setFdCapaVol);
			mapper.map(DietFoodParam::getTypeCode, DietTrayDetailEntity::setFdTpCd);
		});

		modelMapper.typeMap(DietNutrientDto.class, DietStandardDetailEntity.class).addMappings(mapper -> {
			mapper.map(DietNutrientDto::getCode, DietStandardDetailEntity::setNutrCd);
			mapper.map(DietNutrientDto::getMandatoryFlag, DietStandardDetailEntity::setNutrMandFlg);
			mapper.map(DietNutrientDto::getWeightFrom, DietStandardDetailEntity::setNutrWgtFm);
			mapper.map(DietNutrientDto::getWeightTo, DietStandardDetailEntity::setNutrWgtTo);
			mapper.map(DietNutrientDto::getFormula, DietStandardDetailEntity::setNutrFormula);
		});

		modelMapper.typeMap(AddPriceToDietAccessoryParam.class, DietAccessoryEntity.class).addMappings(mapper -> {
			mapper.map(AddPriceToDietAccessoryParam::getName, DietAccessoryEntity::setAccsNm);
			mapper.map(AddPriceToDietAccessoryParam::getPrice, DietAccessoryEntity::setAccsPrc);
			mapper.map(AddPriceToDietAccessoryParam::getReceiptIncludeFlag, DietAccessoryEntity::setRctInclFlg);
		});

		modelMapper.typeMap(AddNutritionSummaryToDietParam.class, DietNutritionSummaryEntity.class)
				.addMappings(mapper -> {
					mapper.map(AddNutritionSummaryToDietParam::getNutrientCode, DietNutritionSummaryEntity::setNutrCd);
					mapper.map(AddNutritionSummaryToDietParam::getNutrientFinalAmount,
							DietNutritionSummaryEntity::setNutrFnlAmt);
				});

	}
}