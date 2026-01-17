/**
 * MinoLab PDF First Page Engine
 * Version: 1.0.4
 * 이제 VS Code를 사용하므로 순수 자바스크립트 코드로 관리됩니다.
 */

export const VERSION = "1.0.4";

/**
 * 첫 페이지의 범위를 반환합니다.
 * @returns {Array} [{start: 0, end: 0}]
 */
export function getFirstPageRange() {
    return [{ start: 0, end: 0 }];
}

/**
 * 로드 완료 메시지
 */
export function getMessage() {
    return `✨ MinoLab First-Page Viewer (v${VERSION}) 가동 준비 완료!`;
}