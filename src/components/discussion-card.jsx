import { formatDateTime } from "../../src/utils/constants";

export function DiscussionCard({ item }) {
  const formattedTime = formatDateTime(item.createdAt);

  return (
    <div className="flex flex-col">
      <p className="text-dark text-lg font-arialBold opacity-60">
        {item.user.username} notes:
      </p>
      <p className="pt-2.5 text-base">{item.content}</p>
      <p className="border-b border-black/[0.2] pb-5 pt-2 mb-5 opacity-60">
        {formattedTime}
      </p>
    </div>
  );
}
