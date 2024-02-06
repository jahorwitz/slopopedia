import { useContext } from "react";
import { DiscussionCard } from "../../components";
import { Button } from "../../components/button/index";
import { CurrentUserContext } from "../../store/current-user-context.js";

export const FestDiscussion = ({ discussionQuery, festQuery }) => {
  const { currentUser } = useContext(CurrentUserContext);
  // Create an array of all attendees to later check if the current user is in list
  const attendeesList = festQuery?.data?.fest?.attendees?.map(
    (person) => person?.id
  );

  return (
    <div className="w-3/5">
      <div>
        {!discussionQuery?.loading &&
        discussionQuery &&
        discussionQuery?.data?.fest?.festNotes?.length === 0 ? (
          <h2 className="font-arial text-lg/4 m-auto text-center pb-96">
            No notes here yet
          </h2>
        ) : (
          <div className="h-96 overflow-y-scroll">
            {discussionQuery?.data?.fest?.festNotes.map((item) => (
              <DiscussionCard item={item} key={item?.id ?? item._id} />
            ))}
          </div>
        )}
      </div>
      {attendeesList?.includes(currentUser?.id) && (
        <div className="flex gap-x-10 mt-10">
          <textarea
            className="w-5/6 h-11 max-h-20 text-left outline-0 border text-dark px-2.5 py-1 border-black/[0.5] resize-none"
            placeholder="Type your message here"
            type="text"
            name="discussion-content"
          ></textarea>
          <Button variant="secondary" size="sm" className="px-6">
            Send
          </Button>
        </div>
      )}
    </div>
  );
};
