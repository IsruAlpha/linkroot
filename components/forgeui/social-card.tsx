"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type * as React from "react";
import { motion } from "motion/react";
import { LuArrowUpRight } from "react-icons/lu";

interface SocialCardProps {
  className?: string;
  image: string;
  title: string;
  name: string;
  pitch: string;
  icon?: React.ReactNode;
  buttons?: Array<{
    label: string;
    icon?: React.ReactNode;
    link?: string;
  }>;
}

const SocialCard = ({
  className,
  image,
  title,
  name,
  pitch,
  icon,
  buttons,
}: SocialCardProps) => {
  const [isHovered, setHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <motion.div
      className={cn(
        "group relative h-87.5 w-70 overflow-hidden rounded-2xl p-0 md:w-75",
        "border border-neutral-200/60 bg-white/50 backdrop-blur-sm hover:cursor-pointer",
        "dark:border-neutral-800/60 dark:bg-neutral-950/50",
        "shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        // Only toggle if not clicking a link
        if ((e.target as HTMLElement).closest('a')) return;
        setIsToggled(!isToggled);
      }}
    >
      <div className="relative mb-2 p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-zinc-900 dark:text-white">
                {icon || (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                  >
                    <g clipPath="url(#clip0-card)">
                      <path
                        d="M65.3404 78.6901C62.42 72.6221 61.118 65.9022 61.5607 59.1826C62.0035 52.4629 64.1761 45.9719 67.8675 40.3396C71.5589 34.7073 76.6438 30.1251 82.6286 27.0377C88.6133 23.9503 95.2946 22.4626 102.024 22.7191C108.753 22.9756 115.302 24.9676 121.034 28.5016C126.767 32.0356 131.488 36.9916 134.74 42.8885C137.992 48.7855 139.664 55.423 139.594 62.1569C139.524 68.8907 137.714 75.4921 134.34 81.3201L102.82 136L112.27 152.37L148.55 89.5301C155.711 76.8108 157.566 61.7803 153.712 47.7018C149.858 33.6233 140.606 21.6332 127.966 14.3345C115.325 7.03585 100.315 5.01775 86.1959 8.71837C72.0763 12.419 59.9862 21.5396 52.5504 34.1001C48.6014 40.8482 46.1424 48.3634 45.3387 56.1406C44.5349 63.9178 45.405 71.777 47.8904 79.1901C50.4182 78.8737 52.963 78.7134 55.5104 78.7101L65.3404 78.6901Z"
                        fill="currentColor"
                      />
                      <path
                        d="M192.49 110.49C188.573 103.613 183.212 97.6655 176.776 93.0581C170.341 88.4506 162.983 85.2922 155.21 83.8001C154.224 86.1582 153.092 88.4527 151.82 90.6701L146.88 99.2201C153.622 99.6343 160.142 101.79 165.802 105.476C171.462 109.162 176.07 114.254 179.174 120.252C182.279 126.251 183.775 132.953 183.517 139.703C183.258 146.452 181.253 153.02 177.698 158.763C174.143 164.507 169.16 169.23 163.234 172.473C157.308 175.715 150.643 177.365 143.889 177.262C137.135 177.159 130.524 175.306 124.7 171.885C118.876 168.463 114.038 163.59 110.66 157.74L79.1904 103.24H60.3004L96.4804 165.92C97.7245 168.059 99.104 170.117 100.61 172.08L100.91 172.47C106.063 179.103 112.673 184.461 120.228 188.13C127.783 191.8 136.082 193.681 144.48 193.63C154.209 193.629 163.767 191.067 172.192 186.202C180.617 181.337 187.613 174.34 192.478 165.915C197.342 157.489 199.903 147.932 199.904 138.203C199.904 128.474 197.344 118.916 192.48 110.49H192.49Z"
                        fill="currentColor"
                      />
                      <path
                        d="M88.1504 159.66C84.4914 165.231 79.4675 169.772 73.5571 172.852C67.6467 175.931 61.0463 177.447 54.3844 177.255C47.7225 177.062 41.2207 175.168 35.4979 171.752C29.7751 168.336 25.0218 163.512 21.6904 157.74C18.2632 151.802 16.459 145.067 16.4589 138.21C16.4589 131.354 18.263 124.619 21.6901 118.681C25.1173 112.742 30.0466 107.811 35.9832 104.381C41.9197 100.951 48.6543 99.1434 55.5104 99.1401H118.58L128 82.7801H55.5104C48.1693 82.6815 40.8817 84.0423 34.0707 86.7834C27.2598 89.5245 21.0613 93.5914 15.8351 98.7478C10.6089 103.904 6.45917 110.048 3.62681 116.821C0.794458 123.595 -0.664062 130.863 -0.664062 138.205C-0.664062 145.547 0.794458 152.816 3.62681 159.589C6.45917 166.363 10.6089 172.506 15.8351 177.662C21.0613 182.819 27.2598 186.886 34.0707 189.627C40.8817 192.368 48.1693 193.729 55.5104 193.63C63.4508 193.677 71.3064 191.996 78.5327 188.705C85.7591 185.414 92.1834 180.591 97.3604 174.57C95.7428 172.481 94.2662 170.286 92.9404 168L88.1504 159.66Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0-card">
                        <rect width="200" height="200" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
              <div className="h-px flex-1 bg-linear-to-r from-neutral-200 to-transparent dark:from-neutral-800"></div>
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <div className="mt-1 h-0.5 w-12 bg-linear-to-r from-neutral-400 to-neutral-200 dark:from-neutral-600 dark:to-neutral-800"></div>
          </div>
        </div>

      {(isHovered || isToggled) && (
          <>
            <motion.img
              src={image}
              alt={title}
              className="absolute top-6 right-4 h-18 w-18 rounded-sm shadow-lg ring-2 ring-white dark:ring-neutral-900"
              width={500}
              height={500}
              layoutId="card-image"
              transition={{ duration: 0.3, ease: "circIn" }}
            />

            <motion.div
              className="absolute top-5.25 right-3.5 h-19.5 w-19.25 rounded-sm border border-dashed border-neutral-400/80 bg-transparent dark:border-neutral-600/80"
              initial={{ opacity: 0, scale: 1.6, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{ delay: 0.35, duration: 0.15, ease: "circIn" }}
            />
          </>
        )}
      </div>

      <div className="mb-4 flex flex-col items-center px-6">
        {!(isHovered || isToggled) && (
          <>
            <motion.img
              src={image}
              alt={title}
              className="h-32.5 w-32.5 rounded-2xl border-4 border-white shadow-xl ring-1 ring-neutral-200/50 dark:border-neutral-900 dark:ring-neutral-800/50"
              width={500}
              height={500}
              layoutId="card-image"
              transition={{ duration: 0.3, ease: "circIn" }}
            />
            <div className="mt-4 text-center">
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {name}
              </h4>
            </div>
          </>
        )}
      </div>

      <motion.div
        className="absolute right-0 bottom-0 left-0 rounded-t-2xl border-t border-neutral-200/80 bg-white/95 px-6 pt-3 pb-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95"
        initial={{ y: "100%" }}
        animate={{
          y: (isHovered || isToggled) ? 0 : "calc(100% - 43px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="text-neutral-900 dark:text-neutral-100">
          <div 
            className="mb-2 flex items-center justify-between text-sm font-semibold text-neutral-900 dark:text-neutral-100 cursor-pointer select-none py-3 -mt-3 -mx-6 px-6 relative z-30"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsToggled(!isToggled);
            }}
          >
            <span>Connect with me</span>
            <motion.div
              className="p-1.5 rounded-full bg-neutral-100 dark:bg-zinc-900 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors"
              animate={{ rotate: (isHovered || isToggled) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <LuArrowUpRight className="rotate-45 size-3.5" />
            </motion.div>
          </div>
          <p className="mb-4 text-xs leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
            {pitch}
          </p>

          <div className="space-y-2">
            {buttons?.map((button, index) => (
              <Link
                target="_blank"
                href={button.link ?? ""}
                key={index}
                className="flex w-full items-center gap-3 rounded-xl border border-neutral-200/60 bg-neutral-50/80 px-4 py-3 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-100/80 hover:text-neutral-900 dark:border-zinc-800/60 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
              >
                <span className="flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                  {button.icon}
                </span>
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialCard;
