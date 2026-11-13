# 애플 스타일 (시안 4)

출처: [webdesignhot – Apple DESIGN.md](https://webdesignhot.com/design.md/apple/) (apple.com 기준 정리). 원문을 옮기지 않고, 이 사이트에 쓰는 값만 요약했다.

## 색 (`src/app/globals.css`)

| 토큰         | 값        | 쓰임                           |
| ------------ | --------- | ------------------------------ |
| `background` | `#ffffff` | 기본 바탕                      |
| `surface`    | `#f5f5f7` | 번갈아 칠하는 구역, 카드, 푸터 |
| `foreground` | `#1d1d1f` | 글자                           |
| `muted`      | `#6e6e73` | 설명·보조 글자                 |
| `divider`    | `#d2d2d7` | 표 선, 입력칸 테두리           |
| `brand`      | `#0071e3` | 강조색은 이것 하나 (버튼)      |
| `link`       | `#0066cc` | 글 속 링크, "자세히 보기 ›"    |

## 모양

- 버튼: 알약 모양(`rounded-full`), 17px. 주 버튼은 파랑 바탕, 보조 버튼은 파랑 테두리.
- 카드: 모서리 18px, 테두리 없음, 회색 바탕(회색 구역 안에서는 흰 바탕), 그림자는 마우스를 올렸을 때만 옅게.
- 헤더: 높이 48px, 반투명 `#fafafc` + 흐림, 테두리·그림자 없음, 글자 12px.
- 구역: 위아래 96px(모바일 64px), 흰색·회색 번갈아(`main > section:nth-of-type(even)`).

## 글자

- 글꼴: 맥·아이폰은 시스템 글꼴(SF), 그 밖에는 Pretendard. SF Pro는 애플 기기 밖에서 쓸 수 없다.
- 첫 화면 제목 60px / 구역 제목 48px / 설명 20px 회색 / 본문 17px. 굵기는 600.
