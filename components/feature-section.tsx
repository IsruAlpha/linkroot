import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { EyeOff, Palette, Sparkles } from "lucide-react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

export function FeatureSection() {
	return (
		<div className="mx-auto max-w-5xl">
			<h2 className="mb-5 text-center font-medium text-2xl md:text-3xl">
				Be Pro User For Linkroot
			</h2>

			<div className="relative">
				{/* Corner Icons */}
				<DecorIcon
					className="size-6 stroke-2 stroke-[#161717]"
					position="top-left"
				/>
				<DecorIcon
					className="size-6 stroke-2 stroke-[#161717]"
					position="top-right"
				/>
				<DecorIcon
					className="size-6 stroke-2 stroke-[#161717]"
					position="bottom-left"
				/>
				<DecorIcon
					className="size-6 stroke-2 stroke-[#161717]"
					position="bottom-right"
				/>

				<DashedLine className="-top-[1.5px] right-3 left-3" />
				<DashedLine className="top-3 -right-[1.5px] bottom-3" />
				<DashedLine className="top-3 bottom-3 -left-[1.5px]" />
				<DashedLine className="right-3 -bottom-[1.5px] left-3" />

				<div className="grid grid-cols-1 md:grid-cols-3">
					{features.map((feature) => (
						<div
							className="group [&_svg]:mask-b-from-0% relative p-8 [&_svg]:size-7 [&_svg]:text-muted-foreground flex flex-col gap-2"
							key={feature.title}
						>
							{feature.icon}
							<h3 className="font-medium text-lg mt-2">{feature.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{feature.description}
							</p>
							<DashedLine className="right-5 bottom-0 left-5 group-last:hidden md:top-5 md:right-0 md:bottom-5 md:left-full" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function DashedLine({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("absolute border-collapse border-[#161717] border border-dashed", className)}
			{...props}
		/>
	);
}

const features: FeatureType[] = [
	{
		title: "Remove Linkroot branding",
		icon: <EyeOff />,
		description: "Make the page truly yours without any Linkroot watermarks on your links.",
	},
	{
		title: "Custom Themes",
		icon: <Palette />,
		description: "Personalize every detail with unlimited custom color palettes themes.",
	},
	{
		title: "AI Powered",
		icon: <Sparkles />,
		description: "Create a custom chatbot powered by AI so users can know more about you.",
	},
];
