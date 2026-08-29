package egovframework.let.diet.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.DefaultIndexedColorMap;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import egovframework.com.cmm.exception.CustomException;
import egovframework.let.diet.dto.DietDetailDto;
import egovframework.let.diet.dto.DietFoodDto;
import egovframework.let.diet.dto.DietMaterialDto;
import egovframework.let.diet.dto.DietNutrientDto;
import egovframework.let.diet.dto.DietNutritionSummaryDto;
import egovframework.let.diet.dto.DietTrayDto;

/**
 * 저장된 식단(diet) 1건 또는 여러 건을 엑셀 파일(.xlsx)로 내보내기 위한 유틸리티.
 *
 * 시트 구성 (식단이 여러 건이어도 시트 개수는 항상 5개로 고정되며, 각 시트 안에 여러 식단의 데이터가 함께 담깁니다):
 *  1) 식단 개요        - 식단 기본 정보
 *  2) 메뉴 구성         - 트레이에 포함된 메뉴(찬) 목록
 *  3) 구성 식재료        - 메뉴별 식재료 + 식품군 정보
 *  4) 영양성분 및 기준 충족여부 - 기준치 대비 실제 섭취량, 충족여부, 부족/초과량
 *  5) 조리법            - 메뉴별로 등록된 조리법 텍스트 (등록된 메뉴만)
 *
 * 식단이 2건 이상 포함될 경우, 각 시트 맨 앞에 "식단명" 열이 추가되어 어느 식단의 데이터인지 구분할 수 있습니다.
 */
public final class DietExcelExporter {

	private static final String FONT_NAME = "Arial";
	private static final String NUMBER_FORMAT_DECIMAL = "#,##0.00";
	private static final String NUMBER_FORMAT_INT = "#,##0";

	private DietExcelExporter() {
	}

	/**
	 * @param diets              내보낼 식단 목록 (1건 이상)
	 * @param summariesByDietId  식단ID -> diet_nutr_smry에 저장된 영양성분 요약 목록
	 */
	public static byte[] export(List<DietDetailDto> diets, Map<Integer, List<DietNutritionSummaryDto>> summariesByDietId) {
		try (XSSFWorkbook workbook = new XSSFWorkbook()) {
			Styles styles = new Styles(workbook);
			boolean multi = diets.size() > 1;
			String downloadedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

			buildOverviewSheet(workbook, styles, diets, multi, downloadedAt);
			buildMenuSheet(workbook, styles, diets, multi);
			buildMaterialSheet(workbook, styles, diets, multi);
			buildNutritionSheet(workbook, styles, diets, multi, summariesByDietId);
			buildRecipeSheet(workbook, styles, diets, multi);

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			workbook.write(out);
			return out.toByteArray();
		} catch (IOException e) {
			throw new CustomException("Failed to generate diet excel export: " + e.getMessage());
		}
	}

	// ------------------------------------------------------------------
	// 1) 식단 개요
	// ------------------------------------------------------------------
	private static void buildOverviewSheet(XSSFWorkbook workbook, Styles styles, List<DietDetailDto> diets,
			boolean multi, String downloadedAt) {
		Sheet sheet = workbook.createSheet("식단 개요");

		if (!multi) {
			DietDetailDto diet = diets.get(0);
			writeTitleRow(sheet, styles, "식단 개요 (다운로드: " + downloadedAt + ")", 1);

			int r = 1;
			r = writeKeyValueRow(sheet, styles, r, "식단명", diet.getName());
			r = writeKeyValueRow(sheet, styles, r, "설명", diet.getDescription());
			r = writeKeyValueRow(sheet, styles, r,
					"영양 기준", diet.getStandard() != null ? diet.getStandard().getName() : null);
			r = writeKeyValueRow(sheet, styles, r,
					"트레이(찬 구성)", diet.getTray() != null ? diet.getTray().getName() : null);
			r = writeKeyValueRow(sheet, styles, r, "제공 인분 수", asString(diet.getServingQuantity()));
			r = writeKeyValueRow(sheet, styles, r, "단가", asString(diet.getUnitPrice()));
			r = writeKeyValueRow(sheet, styles, r, "조정율(%)", asString(diet.getAdjustmentPercent()));
			r = writeKeyValueRow(sheet, styles, r, "최종 가격", asString(diet.getFinalPrice()));

			sheet.setColumnWidth(0, 6000);
			sheet.setColumnWidth(1, 12000);
			sheet.createFreezePane(0, 1);
		} else {
			String[] headers = { "식단명", "설명", "영양 기준", "트레이(찬 구성)", "제공 인분 수", "단가", "조정율(%)", "최종 가격" };
			writeTitleRow(sheet, styles, "식단 개요 (다운로드: " + downloadedAt + ", 총 " + diets.size() + "건)", headers.length - 1);
			writeHeaderRow(sheet, styles, headers, 1);

			int r = 2;
			for (DietDetailDto diet : diets) {
				Row row = sheet.createRow(r);
				writeCell(row, 0, styles.body(r), diet.getName());
				writeCell(row, 1, styles.body(r), diet.getDescription());
				writeCell(row, 2, styles.body(r), diet.getStandard() != null ? diet.getStandard().getName() : null);
				writeCell(row, 3, styles.body(r), diet.getTray() != null ? diet.getTray().getName() : null);
				writeNumericCell(row, 4, styles.numericInt(r), diet.getServingQuantity());
				writeNumericCell(row, 5, styles.numericDecimal(r), diet.getUnitPrice());
				writeNumericCell(row, 6, styles.numericInt(r), diet.getAdjustmentPercent());
				writeNumericCell(row, 7, styles.numericDecimal(r), diet.getFinalPrice());
				r++;
			}

			autoSizeColumns(sheet, headers.length);
			sheet.createFreezePane(0, 2);
		}
	}

	private static int writeKeyValueRow(Sheet sheet, Styles styles, int rowIdx, String key, String value) {
		Row row = sheet.createRow(rowIdx);
		Cell keyCell = row.createCell(0);
		keyCell.setCellValue(key);
		keyCell.setCellStyle(styles.label);

		Cell valueCell = row.createCell(1);
		valueCell.setCellValue(value == null ? "-" : value);
		valueCell.setCellStyle(styles.plainBody);
		return rowIdx + 1;
	}

	// ------------------------------------------------------------------
	// 2) 메뉴 구성
	// ------------------------------------------------------------------
	private static void buildMenuSheet(XSSFWorkbook workbook, Styles styles, List<DietDetailDto> diets, boolean multi) {
		Sheet sheet = workbook.createSheet("메뉴 구성");
		String[] headers = multi
				? new String[] { "식단명", "순서", "찬 종류", "메뉴명", "필수여부", "조리법 등록여부" }
				: new String[] { "순서", "찬 종류", "메뉴명", "필수여부", "조리법 등록여부" };

		writeTitleRow(sheet, styles, "메뉴 구성", headers.length - 1);
		writeHeaderRow(sheet, styles, headers, 1);

		int r = 2;
		for (DietDetailDto diet : diets) {
			for (DietFoodDto food : getFoods(diet)) {
				Row row = sheet.createRow(r);
				int c = 0;
				if (multi) {
					writeCell(row, c++, styles.body(r), diet.getName());
				}
				writeCell(row, c++, styles.body(r), asString(food.getSequence()));
				writeCell(row, c++, styles.body(r), food.getTypeName());
				writeCell(row, c++, styles.body(r), food.getName());
				writeCell(row, c++, styles.body(r), "Y".equalsIgnoreCase(food.getMandatoryFlag()) ? "필수" : "선택");
				boolean hasRecipe = food.getRecipeDescription() != null && !food.getRecipeDescription().isBlank();
				writeCell(row, c++, styles.body(r), hasRecipe ? "등록됨" : "미등록");
				r++;
			}
		}

		autoSizeColumns(sheet, headers.length);
		sheet.createFreezePane(0, 2);
	}

	// ------------------------------------------------------------------
	// 3) 구성 식재료 (+ 식품군 정보)
	// ------------------------------------------------------------------
	private static void buildMaterialSheet(XSSFWorkbook workbook, Styles styles, List<DietDetailDto> diets, boolean multi) {
		Sheet sheet = workbook.createSheet("구성 식재료");
		String[] headers = multi
				? new String[] { "식단명", "메뉴명", "식재료명", "식품군", "재료양", "단위", "환산중량(g)" }
				: new String[] { "메뉴명", "식재료명", "식품군", "재료양", "단위", "환산중량(g)" };

		writeTitleRow(sheet, styles, "구성 식재료", headers.length - 1);
		writeHeaderRow(sheet, styles, headers, 1);

		int r = 2;
		for (DietDetailDto diet : diets) {
			for (DietFoodDto food : getFoods(diet)) {
				List<DietMaterialDto> materials = food.getMaterials();
				if (materials == null || materials.isEmpty()) {
					continue;
				}
				for (DietMaterialDto mat : materials) {
					Row row = sheet.createRow(r);
					int c = 0;
					if (multi) {
						writeCell(row, c++, styles.body(r), diet.getName());
					}
					writeCell(row, c++, styles.body(r), food.getName());
					writeCell(row, c++, styles.body(r), mat.getName());
					writeCell(row, c++, styles.body(r), mat.getCategoryName());
					writeNumericCell(row, c++, styles.numericDecimal(r), mat.getRecipeWeight());
					writeCell(row, c++, styles.body(r), mat.getUnitName());
					writeNumericCell(row, c++, styles.numericDecimal(r), mat.getCalculationWeight());
					r++;
				}
			}
		}

		autoSizeColumns(sheet, headers.length);
		sheet.createFreezePane(0, 2);
	}

	// ------------------------------------------------------------------
	// 4) 영양성분 및 기준 충족여부
	// ------------------------------------------------------------------
	private static void buildNutritionSheet(XSSFWorkbook workbook, Styles styles, List<DietDetailDto> diets,
			boolean multi, Map<Integer, List<DietNutritionSummaryDto>> summariesByDietId) {
		Sheet sheet = workbook.createSheet("영양성분 기준 충족여부");
		String[] headers = multi
				? new String[] { "식단명", "영양소", "단위", "기준(최소)", "기준(최대)", "실제 섭취량", "판정", "부족량", "초과량" }
				: new String[] { "영양소", "단위", "기준(최소)", "기준(최대)", "실제 섭취량", "판정", "부족량", "초과량" };

		writeTitleRow(sheet, styles, "영양성분 기준 충족여부", headers.length - 1);
		writeHeaderRow(sheet, styles, headers, 1);

		int r = 2;
		for (DietDetailDto diet : diets) {
			if (diet.getStandard() == null || diet.getStandard().getNutrients() == null) {
				continue;
			}

			List<DietNutritionSummaryDto> summaries = summariesByDietId == null ? null : summariesByDietId.get(diet.getId());
			Map<String, Double> computedTotals = computeActualNutrients(diet);

			for (DietNutrientDto nutrient : diet.getStandard().getNutrients()) {
				// diet_nutr_smry에 저장된 값이 있으면 우선 사용하고, 없으면 식재료 데이터로 직접 계산
				// (칼로리/영양성분 = SUM(재료 환산중량 * 재료의 g당 영양성분량), mst_fd_nutr와 동일한 방식)
				Double actual = findAmount(summaries, nutrient.getCode());
				if (actual == null) {
					actual = computedTotals.get(nutrient.getCode());
				}
				Double lo = nutrient.getWeightFrom();
				Double hi = nutrient.getWeightTo();

				String judgement;
				double shortfall = 0;
				double excess = 0;

				if (actual == null) {
					judgement = "계산 안됨";
				} else if (lo != null && actual < lo) {
					judgement = "부족";
					shortfall = lo - actual;
				} else if (hi != null && actual > hi) {
					judgement = "초과";
					excess = actual - hi;
				} else {
					judgement = "충족";
				}

				Row row = sheet.createRow(r);
				int c = 0;
				if (multi) {
					writeCell(row, c++, styles.body(r), diet.getName());
				}
				writeCell(row, c++, styles.body(r), nutrient.getName());
				writeCell(row, c++, styles.body(r), nutrient.getUnitName());
				writeNumericCell(row, c++, styles.numericDecimal(r), lo);
				writeNumericCell(row, c++, styles.numericDecimal(r), hi);
				writeNumericCell(row, c++, styles.numericDecimal(r), actual);

				Cell judgementCell = row.createCell(c++);
				judgementCell.setCellValue(judgement);
				judgementCell.setCellStyle(styles.judgement(judgement));

				writeNumericCell(row, c++, styles.numericDecimal(r), shortfall > 0 ? round2(shortfall) : null);
				writeNumericCell(row, c++, styles.numericDecimal(r), excess > 0 ? round2(excess) : null);
				r++;
			}
		}

		autoSizeColumns(sheet, headers.length);
		sheet.createFreezePane(0, 2);
	}

	// ------------------------------------------------------------------
	// 5) 조리법
	// ------------------------------------------------------------------
	private static void buildRecipeSheet(XSSFWorkbook workbook, Styles styles, List<DietDetailDto> diets, boolean multi) {
		Sheet sheet = workbook.createSheet("조리법");
		String[] headers = multi
				? new String[] { "식단명", "메뉴명", "조리법" }
				: new String[] { "메뉴명", "조리법" };

		writeTitleRow(sheet, styles, "조리법", headers.length - 1);
		writeHeaderRow(sheet, styles, headers, 1);

		int r = 2;
		for (DietDetailDto diet : diets) {
			for (DietFoodDto food : getFoods(diet)) {
				String recipe = food.getRecipeDescription();
				if (recipe == null || recipe.isBlank()) {
					continue;
				}
				Row row = sheet.createRow(r);
				row.setHeightInPoints(60);
				int c = 0;
				if (multi) {
					writeCell(row, c++, styles.body(r), diet.getName());
				}
				writeCell(row, c++, styles.body(r), food.getName());
				Cell recipeCell = row.createCell(c++);
				recipeCell.setCellValue(recipe);
				recipeCell.setCellStyle(styles.wrapBody(r));
				r++;
			}
		}

		if (multi) {
			sheet.setColumnWidth(0, 6000);
			sheet.setColumnWidth(1, 6000);
			sheet.setColumnWidth(2, 18000);
		} else {
			sheet.setColumnWidth(0, 6000);
			sheet.setColumnWidth(1, 18000);
		}
		sheet.createFreezePane(0, 2);
	}

	// ------------------------------------------------------------------
	// helpers
	// ------------------------------------------------------------------
	private static List<DietFoodDto> getFoods(DietDetailDto diet) {
		DietTrayDto tray = diet.getTray();
		if (tray == null || tray.getFoods() == null) {
			return List.of();
		}
		return tray.getFoods();
	}

	private static Double findAmount(List<DietNutritionSummaryDto> summaries, String nutrientCode) {
		if (summaries == null || nutrientCode == null) {
			return null;
		}
		return summaries.stream()
				.filter(s -> Objects.equals(s.getNutrientCode(), nutrientCode))
				.map(DietNutritionSummaryDto::getNutrientFinalAmount)
				.findFirst()
				.orElse(null);
	}

	/**
	 * 식단에 포함된 모든 메뉴의 식재료를 돌면서 영양소별 실제 섭취량을 직접 계산한다.
	 * 재료의 nutrients[].amount는 "재료 1g당 영양성분량"이므로, 환산중량(calculationWeight, g)을 곱해서 합산한다.
	 * (mst_fd_nutr을 채울 때 쓴 것과 동일한 공식: SUM(calc_wgt * nutr_amt_per_g))
	 */
	private static Map<String, Double> computeActualNutrients(DietDetailDto diet) {
		Map<String, Double> totals = new HashMap<>();
		for (DietFoodDto food : getFoods(diet)) {
			if (food.getMaterials() == null) {
				continue;
			}
			for (DietMaterialDto mat : food.getMaterials()) {
				Double calcWgt = mat.getCalculationWeight();
				if (calcWgt == null || mat.getNutrients() == null) {
					continue;
				}
				for (DietNutrientDto nutr : mat.getNutrients()) {
					if (nutr.getCode() == null || nutr.getAmount() == null) {
						continue;
					}
					double contribution = calcWgt * nutr.getAmount().doubleValue();
					totals.merge(nutr.getCode(), contribution, Double::sum);
				}
			}
		}
		return totals;
	}

	private static double round2(double value) {
		return Math.round(value * 100.0) / 100.0;
	}

	private static String asString(Object value) {
		return value == null ? "-" : value.toString();
	}

	private static void writeTitleRow(Sheet sheet, Styles styles, String title, int lastColIdxInclusive) {
		Row row = sheet.createRow(0);
		row.setHeightInPoints(26);
		Cell cell = row.createCell(0);
		cell.setCellValue(title);
		cell.setCellStyle(styles.title);
		for (int i = 1; i <= lastColIdxInclusive; i++) {
			Cell filler = row.createCell(i);
			filler.setCellStyle(styles.title);
		}
		if (lastColIdxInclusive > 0) {
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, lastColIdxInclusive));
		}
	}

	private static void writeHeaderRow(Sheet sheet, Styles styles, String[] headers, int rowIdx) {
		Row header = sheet.createRow(rowIdx);
		header.setHeightInPoints(20);
		for (int i = 0; i < headers.length; i++) {
			Cell cell = header.createCell(i);
			cell.setCellValue(headers[i]);
			cell.setCellStyle(styles.header);
		}
	}

	private static void writeCell(Row row, int col, CellStyle style, String value) {
		Cell cell = row.createCell(col);
		cell.setCellValue(value == null ? "-" : value);
		cell.setCellStyle(style);
	}

	private static void writeNumericCell(Row row, int col, CellStyle style, Number value) {
		Cell cell = row.createCell(col);
		if (value == null) {
			cell.setCellValue("-");
		} else {
			cell.setCellValue(value.doubleValue());
		}
		cell.setCellStyle(style);
	}

	private static void autoSizeColumns(Sheet sheet, int columnCount) {
		for (int i = 0; i < columnCount; i++) {
			sheet.autoSizeColumn(i);
			int width = sheet.getColumnWidth(i);
			sheet.setColumnWidth(i, Math.min(width + 512, 12000));
		}
	}

	/** 워크북 전체에서 재사용하는 셀 스타일 모음. */
	private static final class Styles {
		final CellStyle title;
		final CellStyle header;
		final CellStyle label;
		final CellStyle plainBody;
		final CellStyle bodyEven;
		final CellStyle bodyOdd;
		final CellStyle numericEvenDecimal;
		final CellStyle numericOddDecimal;
		final CellStyle numericEvenInt;
		final CellStyle numericOddInt;
		final CellStyle wrapBodyEven;
		final CellStyle wrapBodyOdd;
		final CellStyle judgementOk;
		final CellStyle judgementShort;
		final CellStyle judgementExcess;
		final CellStyle judgementUnknown;

		Styles(XSSFWorkbook workbook) {
			XSSFColor headerBg = rgb(52, 73, 94);
			XSSFColor titleBg = rgb(35, 50, 64);
			XSSFColor stripeBg = rgb(245, 247, 250);
			XSSFColor white = rgb(255, 255, 255);
			XSSFColor okBg = rgb(217, 242, 217);
			XSSFColor shortBg = rgb(253, 236, 200);
			XSSFColor excessBg = rgb(250, 219, 216);
			XSSFColor unknownBg = rgb(234, 234, 234);
			XSSFColor okText = rgb(30, 110, 40);
			XSSFColor shortText = rgb(158, 96, 6);
			XSSFColor excessText = rgb(160, 30, 30);
			XSSFColor unknownText = rgb(100, 100, 100);

			XSSFFont titleFont = (XSSFFont) workbook.createFont();
			titleFont.setFontName(FONT_NAME);
			titleFont.setBold(true);
			titleFont.setFontHeightInPoints((short) 13);
			titleFont.setColor(white);

			XSSFFont headerFont = (XSSFFont) workbook.createFont();
			headerFont.setFontName(FONT_NAME);
			headerFont.setBold(true);
			headerFont.setColor(white);

			XSSFFont labelFont = (XSSFFont) workbook.createFont();
			labelFont.setFontName(FONT_NAME);
			labelFont.setBold(true);

			XSSFFont bodyFont = (XSSFFont) workbook.createFont();
			bodyFont.setFontName(FONT_NAME);

			title = workbook.createCellStyle();
			title.setFont(titleFont);
			((XSSFCellStyle) title).setFillForegroundColor(titleBg);
			title.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			title.setAlignment(HorizontalAlignment.LEFT);
			title.setVerticalAlignment(VerticalAlignment.CENTER);

			header = workbook.createCellStyle();
			header.setFont(headerFont);
			((XSSFCellStyle) header).setFillForegroundColor(headerBg);
			header.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			header.setAlignment(HorizontalAlignment.CENTER);
			header.setVerticalAlignment(VerticalAlignment.CENTER);
			applyThinBorder(header);

			label = workbook.createCellStyle();
			label.setFont(labelFont);
			((XSSFCellStyle) label).setFillForegroundColor(stripeBg);
			label.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			applyThinBorder(label);

			plainBody = workbook.createCellStyle();
			plainBody.setFont(bodyFont);
			applyThinBorder(plainBody);

			bodyEven = workbook.createCellStyle();
			bodyEven.setFont(bodyFont);
			applyThinBorder(bodyEven);

			bodyOdd = workbook.createCellStyle();
			bodyOdd.setFont(bodyFont);
			((XSSFCellStyle) bodyOdd).setFillForegroundColor(stripeBg);
			bodyOdd.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			applyThinBorder(bodyOdd);

			numericEvenDecimal = numericStyle(workbook, bodyFont, null, NUMBER_FORMAT_DECIMAL);
			numericOddDecimal = numericStyle(workbook, bodyFont, stripeBg, NUMBER_FORMAT_DECIMAL);
			numericEvenInt = numericStyle(workbook, bodyFont, null, NUMBER_FORMAT_INT);
			numericOddInt = numericStyle(workbook, bodyFont, stripeBg, NUMBER_FORMAT_INT);

			wrapBodyEven = wrapStyle(workbook, bodyFont, null);
			wrapBodyOdd = wrapStyle(workbook, bodyFont, stripeBg);

			judgementOk = judgementStyle(workbook, okBg, okText);
			judgementShort = judgementStyle(workbook, shortBg, shortText);
			judgementExcess = judgementStyle(workbook, excessBg, excessText);
			judgementUnknown = judgementStyle(workbook, unknownBg, unknownText);
		}

		CellStyle body(int rowIdx) {
			return rowIdx % 2 == 0 ? bodyEven : bodyOdd;
		}

		CellStyle numericDecimal(int rowIdx) {
			return rowIdx % 2 == 0 ? numericEvenDecimal : numericOddDecimal;
		}

		CellStyle numericInt(int rowIdx) {
			return rowIdx % 2 == 0 ? numericEvenInt : numericOddInt;
		}

		CellStyle wrapBody(int rowIdx) {
			return rowIdx % 2 == 0 ? wrapBodyEven : wrapBodyOdd;
		}

		CellStyle judgement(String text) {
			if ("충족".equals(text)) {
				return judgementOk;
			} else if ("부족".equals(text)) {
				return judgementShort;
			} else if ("초과".equals(text)) {
				return judgementExcess;
			}
			return judgementUnknown;
		}

		private static XSSFColor rgb(int r, int g, int b) {
			return new XSSFColor(new byte[] { (byte) r, (byte) g, (byte) b }, new DefaultIndexedColorMap());
		}

		private CellStyle numericStyle(XSSFWorkbook workbook, Font font, XSSFColor bg, String format) {
			CellStyle style = workbook.createCellStyle();
			style.setFont(font);
			style.setAlignment(HorizontalAlignment.RIGHT);
			style.setDataFormat(workbook.createDataFormat().getFormat(format));
			if (bg != null) {
				((XSSFCellStyle) style).setFillForegroundColor(bg);
				style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			}
			applyThinBorder(style);
			return style;
		}

		private CellStyle wrapStyle(XSSFWorkbook workbook, Font font, XSSFColor bg) {
			CellStyle style = workbook.createCellStyle();
			style.setFont(font);
			style.setWrapText(true);
			style.setVerticalAlignment(VerticalAlignment.TOP);
			if (bg != null) {
				((XSSFCellStyle) style).setFillForegroundColor(bg);
				style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			}
			applyThinBorder(style);
			return style;
		}

		private CellStyle judgementStyle(XSSFWorkbook workbook, XSSFColor bg, XSSFColor textColor) {
			XSSFFont font = (XSSFFont) workbook.createFont();
			font.setFontName(FONT_NAME);
			font.setBold(true);
			font.setColor(textColor);

			CellStyle style = workbook.createCellStyle();
			style.setFont(font);
			style.setAlignment(HorizontalAlignment.CENTER);
			((XSSFCellStyle) style).setFillForegroundColor(bg);
			style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			applyThinBorder(style);
			return style;
		}

		private void applyThinBorder(CellStyle style) {
			style.setBorderTop(BorderStyle.THIN);
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
		}
	}
}