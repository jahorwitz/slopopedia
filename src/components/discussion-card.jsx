import { formatDateTime } from "../../src/utils/constants";

export function DiscussionCard({ item }) {
  const formattedTime = formatDateTime(item.createdAt);

  return (
    <>
      <p className="text-dark font-arialBold opacity-60">
        {item.user.username} notes:
      </p>
      <p className="pt-2.5">{item.content}</p>
      <p className="border-b pb-5 pt-2.5 opacity-60 mb-2.5">{formattedTime}</p>
    </>
  );
}
