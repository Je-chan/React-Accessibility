# aria-*

### (1) aria-required
- required 가 true 면 스크린 리더 사용자에게 해당 요소가 필수적으로 작성돼야 한다는 것을 알림
```tsx
<input type={"text"} name={"userName"} id={"userName"} aria-required={true} />
```

### (2) aria-describedby
- 추가 설명을 제공
```tsx
<form>
	<label for={"fname"}>First Name</label>
	<input type="text" name={""} id={"fname"} aria-describedby={"int2"}/>
	<p id={"int2"}>A bit of instructions for this field linked with aria-describedby</p>
</form>
```

### (3) aria-label
- 해당 요소가 어떤 요소인지 바로 설명해주는 것
```tsx
<button aria-label={"send emial"}>send</button>
```

### (4) aria-expanded
- 어떤 탭이 있는데 펼쳐 있는지 닫혀 있는지를 나타냄
- 
```tsx
<div role={"tabpanel"} aria-expanded={true}></div>
```

### (5) aria-pressed
- 해당 요소가 눌려 있는지 눌려 있지 않는 상태인지를 나타냄
```tsx
<button aria-pressed={true}></button>
```