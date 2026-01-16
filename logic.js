/**

PDF Splitter Logic Module

GitHub: impmino/MinoLab/logic.js
*/

// 1. 용량 기반 분할 계산
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

// 2. 퍼센트 기반 분할 계산 (에러 발생 지점 - 함수 존재 확인 필수)
export function calculateSplitRangesByPercent(totalPages, percentages) {
const ranges = [];
let currentStart = 0;

percentages.forEach((percent, index) => {
    const pageCount = Math.round(totalPages * (percent / 100));
    let end = currentStart + pageCount - 1;
    
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

// 3. 연동 확인 메시지
export function getMessage() {
return "✨ PDF 분할 엔진(V2)이 성공적으로 로드되었습니다!";
}