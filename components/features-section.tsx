import { cn } from "@/lib/utils";
import type React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
	ZapIcon,
	PaletteIcon,
	BarChart3Icon,
	GlobeIcon,
	ShieldCheckIcon,
	LayoutGridIcon,
	Sparkles,
} from "lucide-react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn("relative overflow-hidden bg-background p-5 sm:p-6", className)}
			{...props}
		>
			<div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 hidden size-full sm:block">
				<GridPattern
					className="absolute inset-0 size-full stroke-foreground/20"
					height={40}
					width={40}
					x={20}
				/>
			</div>
			<div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
				{feature.icon}
			</div>
			<h3 className="mt-6 text-sm sm:mt-10 md:text-base">{feature.title}</h3>
			<p className="relative z-20 mt-2 text-sm leading-relaxed text-muted-foreground sm:font-light sm:text-xs sm:leading-normal">
				{feature.description}
			</p>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Lightning Fast",
		icon: <ZapIcon />,
		description:
			"Connect your links in under 2 min, and spin up your clean and modern page ",
	},
	{
		title: "Custom Themes",
		icon: <PaletteIcon />,
		description:
			"Personalize every detail with unlimited custom color palettes theme's.",
	},
	{
		title: "AI Powered",
		icon: <Sparkles />,
		description:
			"Create a custom chatbot powered by AI so users can know more about you",
	},
	{
		title: "All Platforms",
		icon: <GlobeIcon />,
		description:
			"Bring your social profiles and side projects into one spot. It looks great on every screen, from phones to desktops.",
	},
	{
		title: "Secure & Private",
		icon: <ShieldCheckIcon />,
		description:
			"We keep things locked down with solid security so you never have to worry about your data.",
	},
	{
		title: "Smart Organization",
		icon: <LayoutGridIcon />,
		description:
			"Keep you links organized, pin, rearrange them so people can what they need.",
	},
];

export function FeaturesSection() {
	return (
		<section id="features">
			<div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-14 sm:space-y-8 sm:px-6 sm:py-24 md:px-8 md:py-32">
				<div className="mx-auto max-w-3xl px-1 text-center">
					<h2 className="font-outfit text-balance text-[1.9rem] font-medium leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
						Designed for power users who value minimal designs.
					</h2>
					<p className="mt-4 text-balance text-sm text-muted-foreground md:text-base">
						Everything you need to stand out and grow your audience.
					</p>
				</div>
				<div className="overflow-hidden rounded-2xl border border-border/50 sm:rounded-lg">
					<div className="grid grid-cols-1 gap-px bg-border/50 sm:grid-cols-2 md:grid-cols-3">
						{features.map((feature) => (
							<FeatureCard feature={feature} key={feature.title} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
