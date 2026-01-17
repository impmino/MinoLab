export const VERSION = "1.2.0";

/**
 * PDF 총 페이지 수를 받아 절반으로 나누는 범위를 계산합니다.
 */
export function getHalfSplitRanges(totalPages) {
    if (totalPages <= 1) return [{ start: 0, end: 0 }];
    
    const midpoint = Math.ceil(totalPages / 2);
    return [
        { start: 0, end: midpoint - 1 },
        { start: midpoint, end: totalPages - 1 }
    ];
}

export function getMessage() {
    return `🚀 미노님, PDF 반반 분할 엔진(v${VERSION})이 활성화되었습니다!`;
}