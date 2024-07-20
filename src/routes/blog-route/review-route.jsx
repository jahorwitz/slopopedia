import { useParams } from "react-router-dom";
import { Header } from "../../components";
import ReviewPage from "../../page/blog/review-page.jsx";

export function ReviewRoute() {
  const { id } = useParams();

  return (
    <>
      <div className="relative" data-test-id="review-header">
        <Header data-test-id="review-header">
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <ReviewPage id={id} data-test-id="review-reviewPage" />
    </>
  );
}
