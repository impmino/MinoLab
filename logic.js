export const VERSION = "1.3.0";

/**
 * PDF 총 페이지 수를 받아 3분할하는 범위를 계산합니다.
 */
export function getThreeSplitRanges(totalPages) {
    if (totalPages <= 1) return [{ start: 0, end: 0 }];
    if (totalPages === 2) return [{ start: 0, end: 0 }, { start: 1, end: 1 }];
    
    const partSize = Math.ceil(totalPages / 3);
    
    const ranges = [
        { start: 0, end: partSize - 1 },
        { start: partSize, end: Math.min(partSize * 2, totalPages) - 1 }
    ];
    
    // 3번째 파트가 존재할 경우 추가
    if (totalPages > partSize * 2) {
        ranges.push({ start: partSize * 2, end: totalPages - 1 });
    }
    
    return ranges;
}

export function getMessage() {
    return `🚀 미노님, PDF 3분할 엔진(v${VERSION})이 활성화되었습니다!`;
}