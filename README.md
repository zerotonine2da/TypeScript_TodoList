# TypeScript TodoList (level 4 )

Thunk + Axios 추 Todolist

## 구분

[components 폴더]
Contents.tsx : 항목 목록 표시 + 삭제 + 상태값 변경(완료-취소)
InputForm.tsx : Todo 항목 추가

[redux 폴더]
config > configStore.tsx : 전역 state 관리 저장소
modules > todoSlice.tsx : Todo 항목 추가, 삭제, 상태변경
* todoSlice.tsx => thunk로 데이터 조회 + 추가 + 삭제 + 변경 전역 상태관리 적용

[axios 폴더]
api.tsx : 인터셉터 + env 파일의 url 주소

[.env파일]
json-server url 작성

[db.json 파일]
데이터 저장용


