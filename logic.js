/**

PDF Splitter Logic Module - Version 1.0.1

GitHub: impmino/MinoLab/logic.js
*/

// [중요] 버전 정보: 코드를 수정할 때마다 이 숫자를 바꿔주세요.
export const VERSION = "1.0.1";

/**

용량(MB) 기반 분할 범위 계산
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

퍼센트(%) 기반 분할 범위 계산
*/
export function calculateSplitRangesByPercent(totalPages, percentages) {
const ranges = [];
let currentStart = 0;

percentages.forEach((percent, index) => {
const pageCount = Math.max(1, Math.round(totalPages * (percent / 100)));
let end = currentStart + pageCount - 1;

 // 마지막 항목 처리
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

로드 확인 메시지
*/
export function getMessage() {
return ✨ MinoLab PDF Engine (v${VERSION}) 로드 완료!;
}