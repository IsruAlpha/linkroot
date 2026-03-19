import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { BlurReveal } from "@/components/ui/blur-reveal";

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-5xl">
			{/* Top Shades */}
			<div
				aria-hidden="true"
				className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
			>
				<div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict" />
			</div>

			{/* X Bold Faded Borders */}
			<div
				aria-hidden="true"
				className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block"
			>
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
			</div>

			{/* main content */}

			<div className="relative flex flex-col items-center justify-center gap-5 pt-40 pb-36">
				{/* X Content Faded Borders */}
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-1 size-full overflow-hidden"
				>
					<div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
					<div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
					<div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
					<div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
				</div>

				<a
					className={cn(
						"group mx-auto flex w-fit items-center gap-3 rounded-full border border-border/40 bg-card px-3 py-1 shadow-sm",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
					href="https://cal.com/israel-firew1/linkroot"
					target="_blank"
					rel="noreferrer"
				>
					<CalendarIcon className="size-3 text-muted-foreground" />
					<span className="text-xs">Request demo</span>
					<span className="block h-5 border-l border-border/40" />

					<ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
				</a>

				<BlurReveal
					as="h1"
					className={cn(
						"font-outfit text-center text-4xl tracking-tight duration-500 ease-out md:text-5xl lg:text-6xl",
						"text-shadow-[0_0px_50px_theme(--color-foreground/.2)]"
					)}
				>
					{`The modern linktree app\nfor your socials`}
				</BlurReveal>

				<BlurReveal
					as="p"
					delay={0.2}
					className="mx-auto max-w-md text-center text-base text-foreground/80 tracking-wider duration-500 ease-out sm:text-lg md:text-xl"
				>
					Create Your Ai Native Linktree.
				</BlurReveal>

				<div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
					<Button className="rounded-full" size="lg" variant="secondary" asChild>
						<a href="/sign-in">
							Sign in
						</a>
					</Button>
					<Button className="rounded-full" size="lg" asChild>
						<a href="/sign-up">
							Get started{" "}
							<ArrowRightIcon data-icon="inline-end" />
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
