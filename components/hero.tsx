"use client";

import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { Badge14 } from "@/components/ui/badge-14";
import { TextAnimate } from "@/components/ui/text-animate";
import { ArrowRightIcon } from "lucide-react";

const CAL_DEMO = "https://cal.com/israel-firew1/linkroot";

export function HeroSection() {
	return (
		<section>
			<div className="relative flex flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-7 sm:px-6 sm:py-20 md:gap-8 md:px-8 md:py-24 lg:py-28">
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-1 size-full overflow-hidden"
				>
					<div
						className={cn(
							"absolute -inset-x-10 inset-y-0 z-0 rounded-full sm:-inset-x-20",
							"bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.1),transparent,transparent)]",
							"blur-[40px] sm:blur-[50px]"
						)}
					/>
					<div className="absolute inset-y-0 left-0 hidden w-px bg-linear-to-b from-transparent via-border to-border sm:left-4 md:left-8 sm:block" />
					<div className="absolute inset-y-0 right-0 hidden w-px bg-linear-to-b from-transparent via-border to-border sm:right-4 md:right-8 sm:block" />
					<div className="absolute inset-y-0 left-8 hidden w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12 md:block" />
					<div className="absolute inset-y-0 right-8 hidden w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12 md:block" />
				</div>

				<div className="fade-in slide-in-from-bottom-10 w-full animate-in fill-mode-backwards delay-500 duration-500 ease-out flex justify-center">
					<Badge14 href={CAL_DEMO}>Book a Demo</Badge14>
				</div>
				<h1
					className={cn(
						"font-outfit max-w-xs text-balance text-center text-[2.2rem] leading-[1.05] tracking-tight text-foreground",
						"sm:max-w-md sm:text-4xl sm:leading-[1.08]",
						"md:max-w-2xl md:text-5xl lg:text-6xl"
					)}
				>
					<TextAnimate
						animation="blurInUp"
						as="span"
						by="word"
						className="block"
						duration={0.45}
					>
						The modern linktree app
					</TextAnimate>
					<TextAnimate
						animation="blurInUp"
						as="span"
						by="word"
						className="block"
						delay={0.35}
						duration={0.45}
					>
						for your socials
					</TextAnimate>
				</h1>

				<p
					className={cn(
						"max-w-sm px-1 text-center text-[0.95rem] leading-relaxed tracking-wide text-muted-foreground",
						"sm:max-w-md sm:text-base sm:tracking-wider",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out"
					)}
				>
					Create your AI-native link page in minutes.
				</p>

				<div className="fade-in slide-in-from-bottom-10 flex w-full max-w-sm animate-in flex-col gap-3 fill-mode-backwards px-1 pt-1 delay-300 duration-500 ease-out sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:px-0 sm:pt-2">
					<Button asChild className="h-11 w-full sm:h-10 sm:w-auto" size="lg" variant="outline">
						<a href="/sign-in">Sign in</a>
					</Button>
					<Button asChild className="h-11 w-full sm:h-10 sm:w-auto" size="lg">
						<a href="/sign-up">
							Get Started <ArrowRightIcon data-icon="inline-end" />
						</a>
					</Button>
				</div>
			</div>
			<div className="relative">
				<DecorIcon className="hidden size-4 sm:block" position="top-left" />
				<DecorIcon className="hidden size-4 sm:block" position="top-right" />
				<DecorIcon className="hidden size-4 sm:block" position="bottom-left" />
				<DecorIcon className="hidden size-4 sm:block" position="bottom-right" />

				<FullWidthDivider className="-top-px" />
				<div className="relative w-full overflow-hidden bg-muted/20 px-4 pb-4 sm:px-0 sm:pb-0">
					<img
						alt="Linkroot dashboard with profile editor and mobile preview"
						className="pointer-events-none mx-auto h-auto w-full max-w-full select-none rounded-2xl object-cover object-top shadow-xl ring-1 ring-border/50 sm:rounded-none sm:shadow-none sm:ring-0"
						decoding="async"
						fetchPriority="high"
						src="/hero-dashboard.png"
					/>
				</div>
				<FullWidthDivider className="-bottom-px" />
			</div>
		</section>
	);
}
