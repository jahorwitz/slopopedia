import { Badge } from "./badge";

export const GreenBadge = () => {
  return (
    <Badge
      className="absolute top-[55px] left-[88px]"
      text="You'll like this!"
      variant="positive"
    />
  );
};

export const YellowBadge = () => {
  return (
    <Badge
      className="absolute top-[83px] left-[67px]"
      text="Give it a try..."
      variant="neutral"
    />
  );
};

export const RedBadge = () => {
  return (
    <Badge
      className="absolute top-[118px] left-[72px]"
      text="You'll hate this for sure"
      variant="negative"
    />
  );
};

export default {
  title: "Components/Badge",
  component: Badge,
};
