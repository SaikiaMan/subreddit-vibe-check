"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SubredditSearchProps {
  initialSubreddit: string;
}

export default function SubredditSearch({
  initialSubreddit,
}: SubredditSearchProps) {
  const router = useRouter();

  const [subreddit, setSubreddit] = useState(initialSubreddit);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanSubreddit = subreddit.trim().replace(/^r\//i, "");

    if (!cleanSubreddit) {
      return;
    }

    router.push(`/?subreddit=${encodeURIComponent(cleanSubreddit)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center"
    >
      <label htmlFor="subreddit-input" className="sr-only">
        Subreddit
      </label>
      <span className="select-none pl-12 text-lg font-medium text-gray-500">
        r/
      </span>
      <input
        id="subreddit-input"
        type="text"
        value={subreddit}
        onChange={(event) => setSubreddit(event.target.value)}
        placeholder="Enter subreddit"
        autoComplete="off"
        className="w-full rounded-lg bg-card py-2 pl-16 pr-4 text-base text-white placeholder:text-gray-500 focus:outline-none"
      />
    </form>
  );
}