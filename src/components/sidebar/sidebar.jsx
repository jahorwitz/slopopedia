import { SidebarItem } from "./sidebar-item";

export const Sidebar = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 whitespace-nowrap">{children}</div>
  );
};

Sidebar.Item = SidebarItem;
