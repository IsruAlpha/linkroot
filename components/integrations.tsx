import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LogoType = {
	icon: string;
	alt: string;
};

type TileData = {
	row: number;
	col: number;
	logo?: LogoType;
};

export function Integrations() {
	return (
		<div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-12 border-x border-border/10 md:grid-cols-2 md:items-center">
			<FullWidthDivider className="-top-px opacity-15" />

			{/* Left Content */}
			<div className="p-8 md:p-12">
				<div className="space-y-4">
					<h2 className="font-outfit font-medium text-3xl text-foreground tracking-tight sm:text-4xl">
						Connect with your favorite tools
					</h2>
					<p className="text-muted-foreground text-sm md:text-base">
						Connect your favorite tools with our growing library of
						integrations.
					</p>
					<Button asChild size="sm">
						<Link href="/blog/integrations">Explore integrations</Link>
					</Button>
				</div>
			</div>

			{/* Right Content - Visual */}
			<div className="place-items-end overflow-hidden">
				<div className="relative size-80">
					{/* Grid Background */}
					<div
						className={cn(
							"absolute inset-0 size-full",
							"bg-[linear-gradient(to_right,theme(--color-border/.15)_1px,transparent_1px),linear-gradient(to_bottom,theme(--color-border/.15)_1px,transparent_1px)]",
							"bg-size-[64px_64px]",
							"mask-[radial-gradient(ellipse_at_center,black,black,transparent)]"
						)}
					/>

					{tiles.map((tile) => (
						<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
					))}
				</div>
			</div>

			<FullWidthDivider className="-bottom-px opacity-15" />
		</div>
	);
}

function IntegrationCard({ row, col, logo }: TileData) {
	return (
		<div
			className={cn(
				"group absolute flex size-16 items-center justify-center transition-colors",
				logo ? "bg-white/[0.03] shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]" : "" // Subtle "pitted" look
			)}
			style={{
				left: col * 64, // 64px cell
				top: row * 64,
			}}
		>
			{logo && (
				<div
					dangerouslySetInnerHTML={{ __html: logo.icon }}
					className={cn(
						"pointer-events-none size-7 select-none object-contain p-1.5 opacity-90 transition-opacity group-hover:opacity-100 text-foreground"
					)}
				/>
			)}
		</div>
	);
}

// Coordinate mapping to approximate the "scattered" look in the image.
// Grid 6x5.
const tiles: TileData[] = [
	// Row 0
	{
		row: 0,
		col: 1,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
			alt: "X Logo",
		},
	},
	{
		row: 0,
		col: 3,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
			alt: "Instagram Logo",
		},
	},

	// Row 1
	{ row: 1, col: 0 }, // Empty
	{
		row: 1,
		col: 2,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
			alt: "Telegram Logo",
		},
	},
	{
		row: 1,
		col: 4,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
			alt: "YouTube Logo",
		},
	},

	// Row 2
	{
		row: 2,
		col: 1,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
			alt: "TikTok Logo",
		},
	},
	{ row: 2, col: 3 }, // Empty

	// Row 3

	{ row: 3, col: 0 }, // Empty
	{
		row: 3,
		col: 2,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.21-.061.524.12.868l.015.029c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509-.015.284-.319.585-.946.815-.616.195-1.275.315-1.964.39-.109.06-.18.255-.269.54-.12.375-.285.777-1.095.777-.39 0-.885-.09-1.59-.27-.495-.12-1.064-.165-1.514-.165-.135 0-.254.009-.359.015-.389.029-.675.044-1.005.15-.18.059-.36.149-.555.27-.57.359-1.29.704-2.55.704-1.215 0-1.95-.345-2.535-.719-.18-.119-.36-.21-.555-.27-.33-.105-.614-.12-1.005-.15-.105-.006-.225-.015-.36-.015-.449 0-1.005.045-1.514.165-.704.18-1.199.27-1.59.27-.809 0-.975-.405-1.094-.78-.09-.284-.165-.479-.27-.539-.689-.075-1.348-.195-1.964-.39-.612-.225-.929-.525-.944-.809-.015-.24.164-.465.42-.509 3.264-.54 4.73-3.879 4.79-4.02l.016-.029c.18-.345.21-.659.119-.869-.195-.434-.884-.674-1.333-.809-.136-.045-.255-.09-.345-.12-.738-.285-1.229-.675-1.214-1.124.016-.39.314-.735.779-.884.135-.045.3-.06.494-.06.12 0 .284.015.449.104.375.18.72.301 1.034.301.199 0 .329-.045.404-.091-.009-.165-.019-.33-.03-.51l-.003-.06c-.105-1.628-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793z"/></svg>`,
			alt: "Snapchat Logo",
		},
	},
	{
		row: 3,
		col: 4,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
			alt: "LinkedIn Logo",
		},
	},

	// Row 4
	{
		row: 4,
		col: 1,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
			alt: "Facebook Logo",
		},
	},
	{
		row: 4,
		col: 3,
		logo: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
			alt: "Spotify Logo",
		},
	},
];
