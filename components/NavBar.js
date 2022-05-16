import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css"; //css 모듈
export default function NavBar() {
  const router = useRouter();
  return (
    // 프로퍼티 형식으로 작성
    //충돌을 ㅏㄴ들지 않음
    //다른 컴포넌트에서 해당 이름이 간으하다.

    <nav>
      <Link href="/">
        <a
          className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}
        >
          home
        </a>
      </Link>
      <Link href="/about">
        <a
          className={[
            styles.link,
            router.pathname === "/about" ? styles.active : "",
          ].join(" ")}
        >
          about
        </a>
      </Link>
    </nav>
  );
}
