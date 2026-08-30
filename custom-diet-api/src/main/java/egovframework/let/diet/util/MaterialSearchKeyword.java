package egovframework.let.diet.util;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 재료 검색어 확장.
 *
 * 식품 데이터에 같은 재료가 두 가지 표기로 들어와 있어서, 한쪽으로 검색하면
 * 나머지를 통째로 놓친다. 실제 등록 건수(2026-08 기준):
 *   쇠고기 168 / 소고기 691, 계란 371 / 달걀 194,
 *   돼지고기 180 / 돈육 48, 닭고기 273 / 계육 2
 *
 * "쇠고기"로 검색하면 원재료 육류가 하나도 안 잡히는데, 원재료는 전부
 * "소고기"로만 등록돼 있기 때문이다.
 */
public class MaterialSearchKeyword {

	private MaterialSearchKeyword() {
	}

	/** 서로 바꿔 쓰는 표기 묶음. 한 단어가 들어오면 같은 묶음의 나머지도 함께 찾는다. */
	private static final List<Set<String>> SYNONYM_GROUPS = List.of(
			Set.of("쇠고기", "소고기", "우육"),
			Set.of("계란", "달걀"),
			Set.of("돼지고기", "돈육"),
			Set.of("닭고기", "계육"));

	private static final Map<String, Set<String>> INDEX = buildIndex();

	private static Map<String, Set<String>> buildIndex() {
		Map<String, Set<String>> index = new java.util.HashMap<>();
		SYNONYM_GROUPS.forEach(group -> group.forEach(word -> index.put(word, group)));
		return index;
	}

	/**
	 * 검색어를 동의어까지 펼친다. 검색어에 동의어가 포함돼 있으면 그 부분만 바꿔치기한
	 * 변형을 함께 돌려준다 ("한우 쇠고기" -> "한우 쇠고기", "한우 소고기", "한우 우육").
	 * 원래 검색어가 항상 첫 번째다.
	 */
	public static List<String> expand(String keyword) {
		List<String> result = new ArrayList<>();
		if (keyword == null || keyword.isBlank()) {
			return result;
		}

		String trimmed = keyword.trim();
		Set<String> variants = new LinkedHashSet<>();
		variants.add(trimmed);

		INDEX.forEach((word, group) -> {
			if (trimmed.contains(word)) {
				group.forEach(alternative -> variants.add(trimmed.replace(word, alternative)));
			}
		});

		result.addAll(variants);
		return result;
	}
}
