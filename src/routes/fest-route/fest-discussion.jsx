import { DiscussionCard } from "../../components";
import { Button } from "../../components/button/index";

export const FestDiscussion = ({ discussionQuery }) => {
  return (
    <>
      <div className="flex-col">
        {!discussionQuery.loading &&
        discussionQuery &&
        discussionQuery.data.fest.festNotes.length === 0 ? (
          <h2 className="font-arial text-lg/4 m-auto">No notes here yet</h2>
        ) : (
          <DiscussionCard discussionQuery={discussionQuery} />
        )}
        <div className="flex gap-x-10">
          <textarea
            className="w-80 h-11 text-left outline-1 border text-dark px-2.5 py-2"
            placeholder="Type your message here"
          ></textarea>
          <Button variant="secondary" size="sm" className="px-7">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
