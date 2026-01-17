/**
 * MinoLab PDF Preview Engine
 * Version: 1.0.3
 */

export const VERSION = "1.0.3";

/**
 * 첫 페이지의 범위를 반환합니다.
 * @returns {Array} [{start: 0, end: 0}]
 */
export function getFirstPageRange() {
    return [{ start: 0, end: 0 }];
}

/**
 * 연동 확인 메시지
 */
export function getMessage() {
    return `🚀 MinoLab PDF Preview Engine v${VERSION} 활성화됨!`;
}