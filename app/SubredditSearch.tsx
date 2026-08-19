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
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex flex-1 items-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/15">
        <label htmlFor="subreddit-input" className="sr-only">
          Subreddit
        </label>
        <svg
          className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="select-none pl-11 text-base font-medium text-slate-400">
          r/
        </span>
        <input
          id="subreddit-input"
          type="text"
          value={subreddit}
          onChange={(event) => setSubreddit(event.target.value)}
          placeholder="Enter subreddit"
          autoComplete="off"
          className="w-full rounded-xl bg-transparent py-3 pl-2 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:ring-offset-2 active:scale-[0.98] sm:w-auto"
      >
        Analyze
      </button>
    </form>
  );
}