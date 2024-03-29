import { useParams } from "react-router-dom";
import { Header } from "../../components";
import ReviewPage from "../../page/blog/review-page.jsx";

export function ReviewRoute() {
  const { id } = useParams();

  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <ReviewPage id={id} />
    </>
  );
}
