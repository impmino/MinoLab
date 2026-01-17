const match = cleanCode.match(codeBlockRegex);
                
                if (match && match[1]) {
                    addLog("마크다운 블록 내부 코드를 추출했습니다.", "warn");
                    cleanCode = match[1].trim();
                } else {
                    // 블록이 없으면 수동으로 기호들 제거
                    cleanCode = cleanCode
                        .replace(/```/g, '')
                        .replace(/^(bash|javascript|js|powershell|txt)\s+/i, '');
                }

                // 4. (중요) 주석 이외의 첫 문자가 export가 아니면 경고
                if (!cleanCode.includes('export')) {
                    addLog("주의: 'export' 키워드를 찾을 수 없습니다.", "error");
                }

                addLog(`코드 정제 완료 (미리보기: ${cleanCode.substring(0, 30)}...)`, "success");

                // Blob 생성 및 임포트
                const blob = new Blob([cleanCode], { type: 'application/javascript' });
                const blobUrl = URL.createObjectURL(blob);
                
                addLog("모듈 엔진 해석 시작...");
                splitModule = await import(blobUrl);
                
                const ver = splitModule.VERSION || "Unknown";
                document.getElementById('version-badge').textContent = `v${ver}`;
                
                const functions = Object.keys(splitModule).filter(k => typeof splitModule[k] === 'function');
                addLog(`연동 성공! 사용 가능 함수: [${functions.join(', ')}]`, "success");

                document.getElementById('connection-status').textContent = `ONLINE (v${ver})`;
                document.getElementById('connection-status').className = "px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-300 shadow-sm";
                
                URL.revokeObjectURL(blobUrl);
            } catch (e) { 
                console.error("Module Error:", e);
                addLog(`모듈 로드 실패: ${e.message}`, "error"); 
                document.getElementById('connection-status').textContent = "연동 실패";
                document.getElementById('connection-status').className = "px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-300";
            }
        }

        let currentFile = null;
        document.getElementById('pdf-input').onchange = (e) => {
            currentFile = e.target.files[0];
            if (currentFile) {
                document.getElementById('file-info').textContent = currentFile.name;
                document.getElementById('option-panel').classList.remove('hidden');
                addLog(`파일 준비됨: ${currentFile.name}`);
            }
        };

        window.splitBy = async (type) => {
            if (!currentFile || !splitModule) return addLog("준비되지 않았습니다.", "error");
            
            try {
                addLog(`${type === 'size' ? '용량' : '퍼센트'} 분할 계산 시작...`);
                const arrayBuffer = await currentFile.arrayBuffer();
                const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                const totalPages = pdfDoc.getPageCount();
                
                let ranges = [];
                if (type === 'size') {
                    const mb = parseFloat(document.getElementById('target-mb').value);
                    if (!mb) throw new Error("용량을 입력하세요.");
                    ranges = splitModule.calculateSplitRangesBySize(totalPages, currentFile.size, mb);
                } else {
                    const input = document.getElementById('target-percent').value;
                    const percents = input.split(',').map(v => parseFloat(v.trim()));
                    if (percents.some(isNaN)) throw new Error("퍼센트 형식이 틀립니다.");
                    ranges = splitModule.calculateSplitRangesByPercent(totalPages, percents);
                }

                addLog(`${ranges.length}개 파일로 분리 중...`);
                for (let i = 0; i < ranges.length; i++) {
                    const newPdf = await PDFLib.PDFDocument.create();
                    const range = ranges[i];
                    const pages = Array.from({length: range.end - range.start + 1}, (_, k) => range.start + k);
                    const copiedPages = await newPdf.copyPages(pdfDoc, pages);
                    copiedPages.forEach(p => newPdf.addPage(p));
                    const bytes = await newPdf.save();
                    const blob = new Blob([bytes], { type: 'application/pdf' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `part_${i + 1}_${currentFile.name}`;
                    link.click();
                    addLog(`Part ${i+1} 완료`, "success");
                }
            } catch (e) { addLog(`오류: ${e.message}`, "error"); }
        };

        window.addEventListener('load', loadRemoteModule);
    </script>
</body>
</html>