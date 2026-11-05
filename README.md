# 쿠킹런 (요리를 만들어요) v36

특수학급용 요리 놀이 앱. `index.html` 하나로 오프라인 동작한다(그림·폰트가 파일 안에 들어 있음).

## 편집·빌드
- 편집: `src/index.template.html` (그림은 `assets/img`, 폰트는 `assets/font`)
- 빌드: `python3 tools/build.py` → `index.html` 재생성. 커밋 전에 반드시 실행
- 그림 추가: `assets/img/키.png`를 넣고 템플릿 `IMG`에 `키:"@@IMG:키.png@@"` 추가. 코드에 `IMG.키` 자리가 있으면 자동 교체
- 필요한 그림 목록과 프롬프트: `docs/superpowers/specs/2026-11-05-cookrun-v36-design.md` §12

## 테스트
- 전체: `NODE_PATH=/opt/node-tools/node_modules node --test tools/test/*.test.mjs`
- 요리 12종 전 단계 순회 + 스크린샷: `NODE_PATH=/opt/node-tools/node_modules node tools/walk.mjs [가|나|다]` → `tools/shots/`
- Playwright가 다른 경로에 있으면 `NODE_PATH`를 그 `node_modules`로 바꾼다

## 문서
- 설계: `docs/superpowers/specs/2026-11-05-cookrun-v36-design.md`
- 구현 계획: `docs/superpowers/plans/2026-11-05-cookrun-v36.md`
