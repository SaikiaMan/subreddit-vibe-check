"use client";

import clsx from "clsx";
import { useSpring, animated } from "@react-spring/web";
import { Icon } from "./Icon";

interface SentimentCardProps {
  id: number;
  name: string;
  position: string;
  count: number;
  percentage: number;
  rise: boolean;
  tasksCompleted: number;
  imgId: number;
}

export function SentimentCard({
  name,
  position,
  count,
  percentage,
  rise,
  tasksCompleted,
  imgId,
}: SentimentCardProps) {
  const { transactions, barPlayhead } = useSpring({
    transactions: count,
    barPlayhead: 1,
    from: { transactions: 0, barPlayhead: 0 },
  });

  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="bg-card flex h-32 justify-between rounded-lg p-3">
        <div>
          <div className="flex items-center">
            <Icon path={`mock_faces_${imgId}`} className="h-10 w-10" />
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">{name}</div>
                <Icon path="res-react-dash-tick" />
              </div>
              <div className="text-sm">{position}</div>
            </div>
          </div>

          <div className="mt-2 text-sm">{`${tasksCompleted}% of all posts`}</div>
          <svg
            className="mt-3 w-44"
            height="6"
            viewBox="0 0 200 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="6" rx="3" fill="#2D2D2D" />
            <animated.rect
              width={barPlayhead.to((i) => i * (tasksCompleted / 100) * 200)}
              height="6"
              rx="3"
              fill="url(#paint0_linear)"
            />
            <rect x="38" width="2" height="6" fill="#171717" />
            <rect x="78" width="2" height="6" fill="#171717" />
            <rect x="118" width="2" height="6" fill="#171717" />
            <rect x="158" width="2" height="6" fill="#171717" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#8E76EF" />
                <stop offset="1" stopColor="#3912D2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <Icon
            path={rise ? "res-react-dash-bull" : "res-react-dash-bear"}
            className="h-8 w-8"
          />
          <animated.div
            className={clsx(
              rise ? "text-green-500" : "text-red-500",
              "font-bold",
              "text-lg",
            )}
          >
            {transactions.to((i) => `${Math.round(i)}`)}
          </animated.div>
          <div className="text-sm">posts</div>
        </div>
      </div>
    </div>
  );
}
