import NavBar from "./NavBar";
export default function Layout({ children }) {
  //app의 Component를 의미한다.
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
