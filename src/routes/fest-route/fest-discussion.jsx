import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { DiscussionCard } from "../../components";
import { Button } from "../../components/button/index";
import { CREATE_DISCUSSION, GET_DISCUSSIONS } from "../../graphql/index.js";
import { CurrentUserContext } from "../../store/current-user-context.js";

export const FestDiscussion = ({ discussionQuery, festQuery, festId }) => {
  const [discussionContent, setDiscussionContent] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  const userId = currentUser?.id;
  const isValid = discussionContent.length !== 0 ? true : false;

  // Create an array of all attendees to later check if the current user is in list
  const attendeesList = festQuery?.data?.fest?.attendees?.map(
    (person) => person?.id
  );

  // Mutation to add discussion to server, and refetch the queries
  const [
    createDiscussion,
    { discussionData, discussionIsLoading, discussionHasError },
  ] = useMutation(CREATE_DISCUSSION, {
    refetchQueries: [GET_DISCUSSIONS],
  });

  // Function to handle clicking of 'send' button; sends API response
  const handleDiscussionSubmit = (evt) => {
    evt.preventDefault();
    createDiscussion({
      variables: {
        data: {
          content: discussionContent,
          user: { connect: { id: userId } },
          fest: { connect: { id: festId } },
        },
      },
    });
    if (discussionIsLoading) return "Submitting...";
    else if (discussionHasError) return `Submission error! ${error.message}`;
    else setDiscussionContent(""); // reset discussionContent to blank
  };

  return (
    <div className="w-3/5">
      <div>
        {/* If discussionQuery is loading or the length is 0, show "no notes here yet" */}
        {!discussionQuery?.loading &&
        discussionQuery &&
        discussionQuery?.data?.fest?.festNotes?.length === 0 ? (
          <h2 className="font-arial text-lg/4 m-auto text-center pb-96">
            No notes here yet
          </h2>
        ) : (
          // otherwise show the posts coming from the backend
          <div className="h-96 overflow-y-scroll">
            {discussionQuery?.data?.fest?.festNotes
              .map((item) => (
                // Map each item onto the DiscussionCard template
                <DiscussionCard item={item} key={item?.id ?? item._id} />
              ))
              .sort((a, b) => {
                // sort posts based on their time elapsed in milliseconds since 1970, place more recent discussions at top
                return (
                  Date.parse(new Date(a.props.item.createdAt)) -
                  Date.parse(new Date(b.props.item.createdAt))
                );
              })}
          </div>
        )}
      </div>
      {/* Check for the userId is in attendees list (only attendees can write comments); if not hide option to write discussion */}
      {attendeesList?.includes(userId) && (
        <div className="flex gap-x-10 mt-6">
          <textarea
            className="w-5/6 h-11 max-h-20 min-h-11 text-left outline-0 border text-dark px-2.5 py-2 border-black/[0.5]"
            placeholder="Type your message here"
            type="text"
            name="discussion-content"
            value={discussionContent}
            onChange={(evt) => setDiscussionContent(evt.target.value)}
          ></textarea>
          <div className="">
            <Button
              disabled={!isValid} // prevent users from being able to submit blank posts
              variant="secondary"
              type="button"
              size="sm"
              className="px-6 h-11 max-h-11"
              onClick={handleDiscussionSubmit}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
