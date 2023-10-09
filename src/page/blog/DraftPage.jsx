import { Draft } from "../../components";
import { dummyDraftData } from "../../utils/constants";

export default function Drafts() {
  return (
    <>
      <div className="w-full max-auto max-w-2xl h-40 left-80 relative">
        {dummyDraftData.map((data, idx) => (
          <Draft
            key={idx}
            title={data.title}
            date={data.date}
            author={data.author}
          />
        ))}
      </div>
    </>
  );
}
