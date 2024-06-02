import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router";
import { Button, DiscussionCard, Header, Loading } from "../../components";
import { IdProtectedRoute } from "../../components/id-protected-route.jsx";
import {
  CREATE_DISCUSSION,
  GET_DISCUSSIONS,
  GET_FEST,
} from "../../graphql/index.js";
import { useCurrentUser } from "../../hooks";
import { FestHeader, FestSidebar } from "../fest-route";

export const FestDiscussion = ({}) => {
  const [discussionContent, setDiscussionContent] = useState("");
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id;
  const festId = useParams().festId;
  const isValid = discussionContent.length !== 0 ? true : false;

  // Fest Query to pull fests from server
  const festQuery = useQuery(GET_FEST, {
    variables: { where: { id: festId } },
  });

  // Create an array of all attendees to later check if the current user is in list
  const attendeesList = festQuery?.data?.fest?.attendees?.map(
    (person) => person?.id
  );
  // Create an array of all invitees to later check if the current user is in list
  const inviteesList = festQuery?.data?.fest?.invitees?.map(
    (person) => person?.id
  );
  // attendees + invitees
  const allowedUserIds = attendeesList?.concat(inviteesList);

  // Discussion Query to pull all discussions from server
  const discussionQuery = useQuery(GET_DISCUSSIONS, {
    variables: { where: { id: festId } },
  });

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

  if (discussionIsLoading) {
    return <Loading />;
  }

  return (
    <IdProtectedRoute
      allowedUserIds={allowedUserIds}
      allowedUserIdsLoading={festQuery.loading}
    >
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="max-w-[1200px] my-0 mx-auto box-border">
        {!festQuery.loading && festQuery?.data?.fest && (
          <FestHeader fest={festQuery.data.fest} />
        )}
        <div className="flex gap-x-24">
          {!festQuery.loading && festQuery?.data?.fest && (
            <FestSidebar festQuery={festQuery} />
          )}
          <div className="w-3/5 sm:w-1/2">
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
                    .map((discussion) => (
                      // Map each item onto the DiscussionCard template
                      <DiscussionCard
                        discussion={discussion}
                        key={discussion?.id ?? discussion._id}
                      />
                    ))
                    .sort((a, b) => {
                      // sort posts based on their time elapsed in milliseconds since 1970, placing more recent discussions at bottom
                      return (
                        Date.parse(new Date(a.props.discussion.createdAt)) -
                        Date.parse(new Date(b.props.discussion.createdAt))
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
        </div>
      </div>
    </IdProtectedRoute>
  );
};
