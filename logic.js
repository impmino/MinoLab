export function getMessage() {
    return "GitHub 모듈 연동 성공!";
}
```

### **3. Git 초기화 및 파일 등록**

```bash
git init
```
> **설명:** 이 폴더를 Git이 관리하는 저장소로 지정합니다.

```bash
git add logic.js
```
> **설명:** 올릴 파일을 장바구니에 담는 과정입니다.

```bash
git commit -m "첫 모듈 업로드"
```
> **설명:** 장바구니에 담긴 파일들을 확정(결제 준비)합니다.

### **4. GitHub 서버와 연결 및 전송**

```bash
git branch -M main
```
> **설명:** 기본 브랜치 이름을 `main`으로 변경합니다.

```bash
git remote add origin [https://github.com/미노님_아이디/my-web-module.git](https://github.com/미노님_아이디/my-web-module.git)
```
> **설명:** 내 컴퓨터와 2단계에서 만든 GitHub 저장소를 연결합니다.

```bash
git push -u origin main
```
> **설명:** 실제로 파일을 GitHub 서버로 전송합니다. 이때 로그인 창이 뜨면 GitHub 계정으로 로그인하시면 됩니다.

---

## 4단계: 제미나이 캔버스 앱에서 호출하기

파일을 성공적으로 올렸다면, 이제 우리 `modular_app.html` 파일에서 불러올 수 있습니다.

### **호출용 주소 만들기**
GitHub 주소 그대로는 브라우저가 읽지 못하므로 `esm.sh` 서비스를 이용합니다.
* **원본:** `https://github.com/미노님_아이디/my-web-module/blob/main/logic.js`
* **변환:** `https://esm.sh/gh/미노님_아이디/my-web-module/logic.js`

### **코드에 적용하기**
캔버스의 `<script type="module">` 부분에 아래와 같이 입력해 보세요.

```javascript
import { getMessage } from '[https://esm.sh/gh/미노님_아이디/my-web-module/logic.js](https://esm.sh/gh/미노님_아이디/my-web-module/logic.js)';

console.log(getMessage()); // "GitHub 모듈 연동 성공!" 출력
```

---

## 💡 팁: 인증 문제 발생 시
최근 GitHub는 보안상 터미널에서 비밀번호를 직접 입력하는 것을 막아두었습니다. 로그인을 요청할 때 브라우저 팝업이 뜨면 **"Sign in with your browser"**를 선택하는 것이 가장 편합니다.