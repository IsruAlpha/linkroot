"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";

type Badge14Props = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

export function Badge14({ href, children, className }: Badge14Props) {
	return (
		<Badge
			asChild
			className={cn(
				"border-border/60 bg-card/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors hover:bg-card",
				className
			)}
			variant="outline"
		>
			<a
				className="group inline-flex items-center gap-1.5 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-ring/50"
				href={href}
				rel="noreferrer"
				target="_blank"
			>
				{children}
				<FiArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
			</a>
		</Badge>
	);
}
