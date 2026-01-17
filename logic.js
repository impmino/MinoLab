/**
 * MinoLab PDF First Page Engine
 * Version: 1.0.5
 */

export const VERSION = "1.0.5";

export function getFirstPageRange() {
    return [{ start: 0, end: 0 }];
}

export function getMessage() {
    return `✨ MinoLab First-Page Viewer (v${VERSION}) 연동 성공!`;
}