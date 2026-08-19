"use client";

import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import SubredditSearch from "../SubredditSearch";

interface DashboardHeaderProps {
  onSidebarShow: () => void;
  initialSubreddit: string;
}

export function DashboardHeader({
  onSidebarShow,
  initialSubreddit,
}: DashboardHeaderProps) {
  return (
    <div className="flex w-full items-end p-2 sm:flex">
      <div className="flex-grow justify-between sm:flex">
        <div>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white">Hello David</div>
            <div className="ml-2 flex items-center rounded-xl bg-card p-2">
              <Icon path="res-react-dash-premium-star" />
              <div className="text-premium-yellow ml-2 font-bold">PREMIUM</div>
            </div>
          </div>
          <div className="flex items-center">
            <Icon
              path="res-react-dash-date-indicator"
              className="h-3 w-3"
            />
            <div className="ml-2">October 26</div>
          </div>
        </div>
        <IconButton
          icon="res-react-dash-sidebar-open"
          className="block sm:hidden"
          onClick={onSidebarShow}
        />
      </div>
      <div className="relative mt-4 w-full sm:mt-0 sm:w-56">
        <Icon
          path="res-react-dash-search"
          className="search-icon absolute left-3 h-5 w-5"
        />
        <SubredditSearch initialSubreddit={initialSubreddit} />
      </div>
    </div>
  );
}
