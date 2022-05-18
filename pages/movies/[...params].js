import { useRouter } from "next/router";
import Seo from "../../components/Seo";
export default function Detail() {
  const router = useRouter();
  const [title, id] = router.query.params || []; //router.query.params를 이용하면 클라이언트 사이드 랜더링 props로 전달받은 것을 이용함녀 서버사이드 렌더링
  return (
    <div>
      <Seo title={title} />
      <h4>{title || "로딩중 ...."} </h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
