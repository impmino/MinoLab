/**

MinoLab PDF Engine

Version: 1.0.2 (수정 버전)

이 파일은 마크다운 기호 없이 순수하게 아래 내용만 있어야 합니다.
*/

export const VERSION = "1.0.2";

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

export function calculateSplitRangesByPercent(totalPages, percentages) {
const ranges = [];
let currentStart = 0;

percentages.forEach((percent, index) => {
    const pageCount = Math.max(1, Math.round(totalPages * (percent / 100)));
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

export function getMessage() {
return 🚀 MinoLab PDF Engine v${VERSION} 연동에 성공했습니다!;
}