# onclick-uses-role
- 상호작용 가능한 태그 'input', 'button'
- 상호작용 가능하지 않은 태그 'div', 'section', 'span'
	- 이런 태그들을 사용하면 스크린 리더기 같은 경우, onClick 을 썼다 해도 그 함수 fn 이 무슨 기능을 하는지 알지 못한다.

```tsx
// >> role="button" 을 넣지 않으면 스크린 리더가 클릭할 수 있는 태그로 받아들이지 않는 것
<span onClick={fn} role={"button"}></span>
```

- 베스트는 상호작용이 필요한 경우, 그에 맞는 태그를 사용하는 것
