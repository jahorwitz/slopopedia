import { useParams } from "react-router-dom";
import { Header } from "../../components";
import ReviewPage from "../../page/blog/review-page.jsx";

export function ReviewRoute() {
  const { id } = useParams();

  return (
    <>
      <div className="relative" data-test-id="review-header">
        <Header data-test-id="review-header">
          <Header.Logo data-test-id="review-header-logo" />
          <Header.NavLinks data-test-id="review-header-navLinks" />
          <Header.Profile data-test-id="review-header-profile" />
        </Header>
      </div>
      <ReviewPage id={id} data-test-id="review-reviewPage" />
    </>
  );
}
