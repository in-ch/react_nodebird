# Hello, Next.js 

## 1-1. 리뉴얼 강좌 소개

> 1. 
>> 새로운 버전에서 next.js가 많이 편해짐 .
>> 1) File system-Based Dynamic Routing -> 동적 라우팅
>> 2) Automatic static optimization : 미리 빌드해 놓는 것 
>> 3) 최적화
>> 4) 로그가 더 자세히 나오게 됨.
> 2. 
>> SSR( 전통적인 방식 ) 
>> vue나 react는 SPA 또는 CSR (방식)

## 1-2. Next.js 역할 소개 

> 1.
>> react는 먼저 페이지를 하나 받고 (데이터없이 화면만 표시) 데이터가 필요한 부분은 백엔드에서 직접 받아오니깐 데이터 방식으로 웹페이지가 움직임.
>> 전통적인 방식은 화면에 전체가 한 번에 그려지나 길다.. 즉 로딩 속도가 길다. 
>> react는 일단 받아오고 데이터 부분은 로딩창이 뜨니 소비자가 인내심이 길어짐 ... 그리고 검색엔진이 로딩창이 보여주니 검색엔진에서 순위가 확 떨어져 버림. 
>> 그래서 검색엔진에 뜨기 위한 해결책이 서버사이드랜더링(프리랜더,서버사이드랜더링, 첫방문만 전통적인 방법대로 데이터를 줌)과 코드스플릿팅(방문한 페이지만 보내줌)
>> 이런 게 다 필요없으면 next.js가 필요없는 거임. next.js가 필요없는 페이지가 admin페이지같은 거임.. 이런 건 그냥 react로 만들면 됨.

## 1-3. 실전 예제와 준비사항

> 1. 
>> 딱히 한 게 없긴 해 

## 1-4. Next.js 실행해보기.

> 1. 
>> next를 설치하면 import React from 'react'; 할 필요가 없다. 
> 2. 
>> pages 폴더는 꼭 필요하다. 그래야 코드스플릿팅이 가능하다.

## 1-5 page와 레이아웃.

> 1. 
>> pages 안에 다른 디렉토리 만드는 것도 가능하다.
> 2.
>> 동적 라우팅 기능이 있다. 6강에 나오는데 . [name].js이라 하면 동적으로 페이지 주소가 바뀐다.
> 3.
>> AppLayout.js를 통해 레이아웃 페이지를 만들 수 있고, children 부분이 바뀌는 부분이다.
>> AppLayout에서는 propTypes를 통해서 프롬스의 타입을 검사할 수 있다.

## 1-6 Link와 eslint

> 1.
>> next에서는 react-router같은 거 필요 없다. 
>> 자체적으로 router가 있음.
>> import Link from 'next/link'; 로 불러와서 쓸 수 있음.
> 2.
>> eslint를 통해서 규칙을 정할 수 있음. 근데 설치해야 하는 게 좀 있는데 package.js 보면서 따라 설치하면 됨.

## 1-7 Q&A 

> 1.
>> 서버사이드랜더링할 때 브라우저-백엔드간 요청에 CORS 설정이 필요하다. 
>> 브라우져가 react이고 프론트 서버, 백엔드 서버가 node인 거임.

# antd 사용해 SNS 화면 만들기 

## 2-1. antd와 styled-components 

> 1.
>> ant.design를 이용해서 디자인 소스 이용할 거임. 다만 개성이 좀 사라짐.. 
>> react에 css 입힐 때 styled components를 이용할 거임 npm trend에서 검색해보니 emotion이 더 많이 쓰임.
> 2.
>> 공식문서보고 원하는 거 쓰면 됨.

## 2-2. _app.js와 Head

> 1.
>> antd는 추가적인 css를 연결해줘야함.
>> 공통적인 페이지를 만들 수 있는데, 거기에 넣어주자.
>> 그 페이지의 이름은 _app.js임 

> 2.
>> next에서 head를 수정할 수 있는 head 컴포넌트가 있다.
>> 그냥 head 막 넣으면 안된다. 

## 2-3. 반응형 그리드 사용하기

> 1. 
>> style = {{}}를 통해서 기존에 컴포넌트를 뒤집어 씌울 수 있다. 
> 2.
>> xs: 모바일, sm: 태블릿, md: 작은 데스크탑 
> 3.
>> 컬럼들이 너무 붙어있으니깐 gutter를 사용해서 간격을 띄워줄 수 있음.
> 4.
>> a링크에 target='_blank' 할 때 보안위협이 있으니깐 rel="noreferrer noopener"는 필수로 같이 적어줘야함.

## 2-4 로그인 폼 만들기

> 1.
>> 그냥 따라 침

## 2-5 리렌더링 이해하기

> 1.
>> 원래 스타일 때려 넣을 때, style={{}} 이렇게 때려 넣으면 안된다. {} === {}같이 객체끼리 비교하는 건 false기 때문에 자꾸 그 부분이 리랜더링된다.
>> 그래서 styled-components를 이용해야 한다. 
>> const ButtonWrapper = styled.div `
    margin-top: 10px;
` 
>> 같이 컴포넌트를 새로 하나 정의해 주고 써야 한다. 

> 2.
>> 혹은 useMemo 써야 한다. 

## 2-6 더미 데이터로 로그인하기

> 1.
>> <Form> 태그에서 onSubmitForm은 없고 onFinish라고 있다. 
>> antd 에는 기본적으로 e함수가 포함되어 있기 때문에, e.target.value를 바로바로 쓸 수 있다. 

## 2-7 크롬 확장프로그램과 Q&A 

> 1. 
>> react dev tool랑 redux는 꼭 사용하고 익숙해 지길

## 2-8 프로필 페이지 만들기

> 1.
>> 여기서 인라인 스타일로 했는데, 나중에 다 최적화 해줘야 한다. 
> 2.
>> 100줄 넘어가면 웬만하면 컴포넌트 나눠주자.

## 2-9 회원가입 페이지 만들기 (커스텀 훅)

> 1. 
>> 변수들 일일히 쓰는 게 너무 번거롭다. 커스텀 훅을 쓰면 간단해 진다.

# 3 Redux 연동하기

# 리덕스 설치와 필요성 소개

> 1.
>> 리덕스는 초보자한테 좋다.
>> mobx는 좀 어렵다. 
>> next redux wrapper를 이요하면 redux를 쉽게 붙일 수 있게 해준다. 일반 리덕스랑은 조금 다르다.
> 2.
>> 데이터를 취합하기 위해서 redux를 쓰는 것이다. 일일히 부모컴포넌트한테 데이터를 보내기가 귀찮기 때문에.
>> 중앙에서 하나로 관리하는 것임.

# 리덕스의 원리와 불변성

> 1.
>> action을 하나 만들어 두고 action을 dispatch해서 중앙 데이터를 바꾸는 거임. 
>> 여기서 reducer라는 개념이 있는데 action을 dispatch한다고 해서 바로 바뀌는 게 아니라 우리가 reducer에서 어떻게 바꿔야 하는 지 다 알려주는 것이다.
>> 보통 reducer는 switch문으로 되어 있다. 
>> 코드량은 많아지는 대신에 action에 다 데이터가 기록되기 때문에 버그 찾기가 쉬움.
>> reducer에 ...state하는 이유는 코드량도 있지만 메모리를 아끼기 위함이 있다. 

# 리덕스 실제 구현하기

> 1.
>> 동적 액션을 활용하자. 일반 액션을 쓰면 일일히 똑같은 변수 계속 생성해야 해서 비효율적이다.
> 2.
>> 스토어에 있는 데이터 가져올려면 useSelector라는 걸 써야 되는데, react-redux다운 받아서 써야함.
> 3.
>> 이제 굳이 컴포넌트있을 때 프롭스 넘길 필요 없고, dispatch할 때는 useDispatch불러 와서 쓰면 됨. 

# 미들웨어와 리덕스 데브툴즈

> 1.
>> HYDRATE는 6강에 나옴
> 2.
>> 리덕스에 미들웨어를 붙여서 개발자 redux부분에서 로그인/로그아웃(액션)이 뜨는 지 확인해야 함.
>> 근데 액션 기록들이 개발자일 때는 떠야하는데, 배포 모드일 때 뜨면 보안에 취약해주니 이것을 가려줭 함. configureStore.js에 설정해서
>> 배포모드 일 때는 devtools로 바꿀 수가 있다. 
> 3.
>> 만약 포트 port 바꾸고 싶다면 package.js부분에 scripts 부분에서 dev를 next -p 3060 등으로 바꾸면 됨

# 리듀서 쪼개기

> 1. 
>> 나중에 action이랑 case가 너무 많아지니 쪼개야 한다. 
> 2.
>> 쪼개고 combineReducers를 통해서 합쳐줄 수 있다. 

# 더미데이터와 포스트폼 만들기

# 게시글 구현하기

> 1.
>> 배열안에 json은 꼭 key가 들어가야 한다. 
> 2.
>> 옵션얼 체이닝
> 3.
>> toggle에서 함수 적는 법 

# 댓글구현하기

# 이미지 구현하기 

> 1. 
>> role="" 이거 이미지 태그 옵션은 그냥 시각 장애인분들을 위한 옵션이다.
