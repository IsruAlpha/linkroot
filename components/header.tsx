"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { useScroll } from "@/hooks/use-scroll";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import Link from "next/link";
import { LinkrootLogo } from "@/components/linkroot-logo";

export const navLinks = [
	{
		label: "Features",
		href: "/#features",
	},
	{
		label: "Pricing",
		href: "/#pricing",
	},
	{
		label: "Blog",
		href: "/blog",
	},
];

export function Header() {
	const scrolled = useScroll(10);
	const { user } = useAuth();

	return (
		<header
			className={cn(
				"sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
				{
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
						scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<Link
					className="rounded-md p-2 transition-colors hover:bg-muted dark:hover:bg-muted/50"
					href="/"
				>
					<LinkrootLogo />
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Button asChild key={link.label} size="sm" variant="ghost">
								<Link href={link.href}>{link.label}</Link>
							</Button>
						))}
					</div>
					{!user ? (
						<>
							<Button asChild size="sm" variant="outline">
								<a href="/sign-in">Sign In</a>
							</Button>
							<Button asChild size="sm">
								<a href="/sign-up">Get Started</a>
							</Button>
						</>
					) : (
						<Button asChild size="sm">
							<Link href="/dashboard">Dashboard</Link>
						</Button>
					)}
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
