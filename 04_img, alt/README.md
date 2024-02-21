# img-uses-alt
- img, alt 속성을 사용해서 이미지가 나오지 않을 떄 이미지를 설명한다
- ['image', 'picture', 'photo'] 등과 같은 text 는 alt 속성에 사용하지 말 것

```tsx
<img src="src" alt="logo"/>
	
// 아래와 같이 하면 접근성이 좋지 않음
<img src="src" alt=""/>

// role 이 presentation 이라면 시멘틱 태그의 의미를 지운다는 것을 의미한다.
// >> img 태그의 의미는 "이미지" 이므로, 그런 의미를 지운다는 것
<img src="src" alt="" role="presentation"/>


``` 