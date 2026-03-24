import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const blogs = [
	{
		title: "7 Best Free Linktree Alternatives in 2026",
		date: "Mar 25 2026",
		description:
			"Linktree is everywhere. But is it actually the best option? We tried a bunch of link-in-bio tools so you don't have to.",
		href: "/blog/linktree-alternatives",
	},
	{
		title: "AI-Native: The Future of Linktree",
		date: "Mar 21 2026",
		description:
			"How our app is revolutionizing Linktree apps with AI-native integration and clean and minimal designs!",
		href: "/blog/ai-native",
	},
	{
		title: "Connect Your Favorite Tools with Linkroot",
		date: "Mar 10 2026",
		description:
			"Discover how our growing library of integrations makes it easy to connect all your favorite platforms in one place.",
		href: "/blog/integrations",
	},
];

export function BlogsSection() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-start md:border-x md:border-border/20">
			<div className="space-y-4 px-4 py-8 md:py-12">
				<Link 
					href="/" 
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
				>
					<ArrowLeft className="size-4" />
					Back to Home
				</Link>
				<h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
					Latest Blogs
				</h1>
				<p className="text-muted-foreground text-sm">
					Discover the latest trends and insights in the world of design and
					technology.
				</p>
			</div>

			<div className="relative">
				<FullWidthDivider className="opacity-20" />
				<div className="divide-y divide-border/20">
					{blogs.map((blog) => (
						<BlogCard {...blog} key={blog.title} />
					))}
				</div>
				<FullWidthDivider className="opacity-20" />
			</div>
		</div>
	);
}

function BlogCard({
	title,
	date,
	description,
	className,
	...props
}: React.ComponentProps<"a"> & {
	title: string;
	date: string;
	description: string;
}) {
		return (
			<a
				className={cn(
					"group flex min-h-24 w-full flex-col justify-center gap-y-2 p-6 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50 transition-colors",
					className
				)}
				{...props}
			>
				<div className="relative flex flex-col md:flex-row md:items-end justify-between gap-2">
					<h3 className="font-semibold text-foreground text-lg md:text-xl leading-tight">
						{title}
					</h3>
					<span className="hidden md:block mb-[6px] flex-1 border-b-2 border-dashed border-border/30" />
					<span className="whitespace-nowrap font-mono text-muted-foreground text-[10px] md:text-xs uppercase group-hover:text-foreground">
						{date}
					</span>
				</div>
				<div className="max-w-sm text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
					{description}
				</div>
			</a>
		);
}
