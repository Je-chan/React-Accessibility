# mouse-events-have-key-events
- onMouseOver 나 onMouseOut 을 사용할 때는 onFocus, onBlur 를 같이 사용해야 한다.
```tsx
// 마우스를 오버했을 때, 스크린을 사용하신 분들은 mouseOver 이벤트를 동작시킬 수 없다
// >> 이런 경우 onFocus 이벤트를 사용하면 된다
<div onMouseOver={fn} onFocus={focusFn}></div>

<div onMouseOut={fn} onBlur={blurFn}></div>
```