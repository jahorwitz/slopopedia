export function DiscussionCard({ discussion }) {
  // format date according to the figma & return formatted date
  const formatDiscussionDay = (dateTime) => {
    let date = new Date(dateTime);
    const HH = String(date.getUTCHours()).padStart(2, 0);
    const MM = String(date.getUTCMinutes()).padStart(2, 0);
    const YYYY = date.getUTCFullYear();
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${HH}:${MM}, ${month} ${day}, ${YYYY}`;
  };

  return (
    // Use API reponse to insert data
    <div className="flex flex-col">
      <p className="text-dark text-lg font-arialBold opacity-60">
        {discussion.user.username} notes:
      </p>
      <p className="pt-2.5 text-base">{discussion.content}</p>
      <p className="border-b border-black/[0.2] pb-5 pt-2 mb-5 opacity-60">
        {formatDiscussionDay(discussion.createdAt)}
      </p>
    </div>
  );
}
