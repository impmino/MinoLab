/**
 * GitHub 업로드 테스트용 로직 파일
 * 이 파일의 내용이 바뀌고 Push되면 대시보드에서 즉시 확인 가능합니다.
 */

export function getMessage() {
    const luckyMessages = [
        "✨ 오늘은 코드가 한 번에 돌아갈 운명입니다!",
        "🚀 새로운 기능을 구현하기에 아주 좋은 날이네요.",
        "💡 예상치 못한 버그가 창의적인 아이디어로 변할 것입니다.",
        "🍀 미노님의 MinoLab 프로젝트가 멋지게 성장하고 있습니다.",
        "🎉 GitHub 데스크톱 연동 테스트 성공을 축하합니다!"
    ];
    
    // 무작위로 메시지 하나를 골라서 반환합니다.
    const randomIndex = Math.floor(Math.random() * luckyMessages.length);
    return luckyMessages[randomIndex];
}