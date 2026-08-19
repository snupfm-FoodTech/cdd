const SectionPageInfo = () => {
    return (
        <div className="flex justify-center space-x-4 p-8 mt-4">
            {/* First Card */}
            <div className="hole-card-1 relative bg-green-500 text-white rounded-xl p-10 pl-12 w-1/3 transition duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4">트레이 관리 앱</h2>
                <ul className="space-y-2">
                    <li>트레이에 음식 추가</li>
                    <li>트레이에서 음식 삭제</li>
                    <li>트레이의 음식 수정</li>
                    <li>트레이에 있는 음식의 세부 정보 수정</li>
                    <li>특정 음식을 빠르게 찾기</li>
                </ul>
            </div>
            {/* Second Card */}
            <div className="hole-card-2 bg-blue-500 text-white rounded-xl p-10 pl-20 w-1/3 hover:bg-blue-600 transition duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4">재료 관리 앱</h2>
                <ul className="space-y-2">
                    <li>새로운 재료를 목록에 추가</li>
                    <li>재료 이름, 수량, 가격 입력</li>
                    <li>불필요한 재료 삭제</li>
                    <li>기존 재료 정보 수정</li>
                    <li>재료 검색</li>
                </ul>
            </div>
            {/* Third Card */}
            <div className="hole-card-3 bg-orange-500 text-white rounded-xl p-10 pl-20 w-1/3 transition duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4">음식 및 재료 관리 앱</h2>
                <ul className="space-y-2">
                    <li>식사의 총 비용 계산</li>
                    <li>사용된 모든 재료의 가격 합산</li>
                    <li>다른 인분을 위해 재료 양 조정</li>
                    <li>재료 양을 곱하거나 나눔</li>
                </ul>
            </div>
        </div>
    );
};

export default SectionPageInfo;
