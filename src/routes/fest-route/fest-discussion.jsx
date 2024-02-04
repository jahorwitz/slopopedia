import { DiscussionCard } from "../../components";
import { Button } from "../../components/button/index";

export const FestDiscussion = ({ discussionQuery }) => {
  return (
    <div className="w-3/5">
      <div className="">
        {!discussionQuery.loading &&
        discussionQuery &&
        discussionQuery?.data?.fest?.festNotes?.length === 0 ? (
          <h2 className="font-arial text-lg/4 m-auto text-center pb-96">
            No notes here yet
          </h2>
        ) : (
          <div className="overflow-y-scroll">
            {discussionQuery.data.fest.festNotes.map((item) => (
              <DiscussionCard item={item} key={item?.id ?? item._id} />
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-x-10 mt-5">
        <textarea
          className="w-5/6 h-11 text-left outline-1 border text-dark px-2.5 py-2"
          placeholder="Type your message here"
        ></textarea>
        <Button variant="secondary" size="sm" className="px-6">
          Send
        </Button>
      </div>
    </div>
  );
};
