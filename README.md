# 노마드코더 NextJs 강의를 들으며

## pages

pages 폴더에 파일을 추가하는 것 자체만으로 페이지가 만들어진다.

- pages 바로 아래에 index.js는 `"/"`를 의미한다.
- pages의 다른 파일은 `"/다른파일"`을 의미한다.
- pages의 폴더는 `"/폴더"`를 의미하며 폴더안의 index.js는 `"/폴더/"`를 다른 파일은 `"/폴더/다른 파일"`을 의미한다.
- `/폴더/:id` 뒤에 어떠한 주소든 호환되는 페이지를 원한다면 폴더안에 [id].js 파일을 만든다.
- `/폴더/:id/:title/......` 뒤에 쿼리스트링이 많이 온다면 [...params].js 파일을 만든다.

## 서버사이드 렌더링

서버 측에서 데이터를 불러와 렌더링하는 방법으로 SEO에 좋다.

```jsx
//컴포넌트 하단에 아래 함수를 만들어준다.
export async function getServerSideProps() {
  return {
    props: {
     number: 10;
    },
  };
}
```

반환하는 값을 props로 불러와서 사용할 수 있다.

```jsx
export default function Home({ results })
```

## 스타일

### 1. module로 추가하는 방법

컴포넌트 파일과 같은 폴더에 `이름.module.css` 파일을 만들어 준다.

```jsx
.nav{
	color: red;
}
```

사용할 컴포넌트에 `import styles from "./NavBar.module.css"` 로 모듈을 불러온다.

사용은 `className={styles.nav}`와 같이 이용한다.

이는 object의 프로퍼티 방식으로 작성하며 실제 클래스 이름은 `.nav__dsad`와 같이 뒤에 랜덤 문자가 들어가 클래스 이름 충돌을 방지할 수 있다.

두가지 이상의 클래스를 부착하고 싶을 땐 다음과 같다.

1. `` 이용하기

```jsx
className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`
```

1. 배열의 join 메서드 이용하기

```jsx
className={[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")}
```

### 2. styled jsx 방식

NextJS에서 사용하는 스타일 방식

컴포넌트 내부 return 안에서 사용한다.

- ` <style jsx>{``}</style> ` 의 구조

```jsx
<nav>
  <Link href="/">
    <a className={router.pathname === "/" ? "active" : ""}>home</a>
  </Link>
  <Link href="/about">
    <a className={router.pathname === "/about" ? "active" : ""}>about</a>
  </Link>

  <style jsx>{`
    nav {
      background-color: red;
    }
    a {
      text-decoration: none;
    }
    .active {
      color: yellow;
    }
  `}</style>
</nav>
```

이 경우 장점은

1.  jsx-1213132와 같은 클래스 이름이 만들어져 클래스 이름 중복을 예방해준다.
2.  문자열을 이용한 스타일이므로 `color: {변수}` 처럼 변수 삽입이 가능하다.

위 두가지 스타일은 컴포넌트 내에서 한정된다. 따라서 부모 컴포넌트에서 자식 컴포넌트의 스타일을 지정할 수 없다.

## global 스타일 주기

### 1. style jsx global

```jsx
<style jsx global>{`
  a {
    color: white;
  }
`}</style>
```

style jsx 방식에 뒤에 global 키워드를 넣어 자식 컴포넌트에서도 적용되게 사용할 수 있다.

- but 동일한 레벨에 있는 페이지들에선 적용되지 않음

### 2. Custom App

\_app.js 파일을 pages 폴더 안에 만든다.

이는 다른 page보다 먼저 확인하며 그 다음에 다른 페이지를 확인하게 된다.

파일을 만들었다면 아래의 코드를 붙여준다.

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

작동 원리는 다음과 같다.

NextJs 내부에서 about, index 컴포넌트의 내용들을 \_app.js의 `Component props`로 전달하게 된다.

또한 페이지마다 공통되는 사항은 App 안에 넣어둬서 관리할 수 있다.

```jsx
export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} /> <span>kii</span>
    </>
  );
}
```

따라서 이 안에서 style jsx global을 사용해 스타일을 지정할 수 있다.

또는 Custom App 방식에서만 `import “../styles/globals.css”` 와 같이 스타일을 불러올 수 있다.
