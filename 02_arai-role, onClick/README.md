# arai-role
- 보조기구가 각 요소의 역할을 알 수 있게 해준다.

[WAI-ARIA](http://www.w3.org/WAI/PF/aria/roles#roles_categorization)

```javascript
<div role="button"> </div>
```

# aria-unsupported-element
- 역할을 줄 수 없는 요소들도 존재한다
- 아래의 요소는 aria-role 을 지원하지 않는다
	  - 'meta', 'html', 'script', 'style'

# click-events-have-key-events
- 시각적으로 보이지 않는 분들은 마우스로 클릭할 수 없으니 키보드로 해야 함
- onKeyDown, onKeyUp, onKeyPress 등의 이벤트를 사용하면 됨
- 우리가 평소 만들 때 onClick 만 사용하지만, 보조 기구, 웹 접근성을 생각한다면 key 이벤트를 고려해야 한다.
```jsx
<div onClick={fn} onKeyDown={handleKeyDown}></div>
```