import { HorizontalMenuItem } from "./horizontal-menu-item";

export const HorizontalMenu = ({ children }) => {
  return (
    <div className=" border max-w-screen-lg h-18 overflow-x-auto overscroll-x-contain px-5 ">
      <ul className="flex flex-row gap-14 justify-center">{children}</ul>
    </div>
  );
};

HorizontalMenu.Item = HorizontalMenuItem;
