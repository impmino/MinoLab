/**
 * PDF Splitter Logic Module
 * GitHub에 저장되어 원격으로 계산 로직을 제공합니다.
 */

/**
 * 용량(MB) 기반으로 분할할 페이지 범위를 계산합니다.
 * @param {number} totalPages 전체 페이지 수
 * @param {number} totalSizeBytes 전체 파일 크기 (Bytes)
 * @param {number} targetSizeMB 목표 분할 용량 (MB)
 * @returns {Array} 페이지 범위 배열 [{start, end}, ...]
 */
export function calculateSplitRangesBySize(totalPages, totalSizeBytes, targetSizeMB) {
    const totalSizeMB = totalSizeBytes / (1024 * 1024);
    const pagesPerPart = Math.ceil(totalPages / (totalSizeMB / targetSizeMB));
    
    const ranges = [];
    for (let i = 0; i < totalPages; i += pagesPerPart) {
        ranges.push({
            start: i,
            end: Math.min(i + pagesPerPart - 1, totalPages - 1)
        });
    }
    return ranges;
}

/**
 * 퍼센트(%) 기반으로 분할할 페이지 범위를 계산합니다.
 * @param {number} totalPages 전체 페이지 수
 * @param {Array} percentages 퍼센트 배열 (예: [30, 70])
 * @returns {Array} 페이지 범위 배열
 */
export function calculateSplitRangesByPercent(totalPages, percentages) {
    const ranges = [];
    let currentStart = 0;
    
    percentages.forEach((percent, index) => {
        const pageCount = Math.round(totalPages * (percent / 100));
        let end = currentStart + pageCount - 1;
        
        // 마지막 항목은 남은 모든 페이지를 포함
        if (index === percentages.length - 1 || end >= totalPages) {
            end = totalPages - 1;
        }
        
        if (currentStart < totalPages) {
            ranges.push({ start: currentStart, end: end });
        }
        currentStart = end + 1;
    });
    
    return ranges;
}

/**
 * 테스트용 메시지
 */
export function getMessage() {
    return "✨ PDF 분할 엔진이 GitHub으로부터 로드되었습니다!";
}