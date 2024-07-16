export function DiscussionCard({ discussion }) {
  // format date according to the figma & return formatted date
  const formatDiscussionDay = (dateTime) => {
    const date = new Date(dateTime);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const HH = String(date.getHours()).padStart(2, 0);
    const MM = String(date.getMinutes()).padStart(2, 0);
    const YYYY = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    return `${HH}:${MM}, ${months[month]} ${day}, ${YYYY}`;
  };

  return (
    // Use API reponse to insert data
    <div className="flex flex-col" data-test-id="discussion-card-div">
      <p
        className="text-dark text-lg font-arialBold opacity-60"
        data-test-id="discussion-card-name-p"
      >
        {discussion.user.username} notes:
      </p>
      <p className="pt-2.5 text-base" data-test-id="discussion-card-content-p">
        {discussion.content}
      </p>
      <p
        className="border-b border-black/[0.2] pb-5 pt-2 mb-5 opacity-60"
        data-test-id="discussion-card-date-p"
      >
        {formatDiscussionDay(discussion.createdAt)}
      </p>
    </div>
  );
}
